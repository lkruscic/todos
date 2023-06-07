import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, take} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {TodoInterface} from '../types/todo.interface';
import {FilterEnum} from '../types/filter.enum';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);
  private todosUrl: string = 'api/todos';

  constructor(private http: HttpClient) {
    this.getAllTodos();
  }

  getAllTodos(): void {
    this.http.get<TodoInterface[]>(this.todosUrl).pipe(
      take(1),
      map((todos) => {
        console.log('fetched todos: ', todos);
        this.todos$.next(todos);
      })
    ).subscribe((todos) => console.log(todos))
  }

  addTodo(text: string) {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
    };
    return this.http.post<TodoInterface>(this.todosUrl, newTodo, this.httpOptions).pipe(
      take(1),
      tap((newTodo) => {
        console.log('Added new todo:', newTodo);
        const updatedTodos = [...this.todos$.getValue(), newTodo];
        this.todos$.next(updatedTodos);
      }),
      catchError(this.handleError<TodoInterface>('addTodo'))
    ).subscribe();
  }

  /** GET todo by id. Return `undefined` when id not found */
  getTodoNo404<Data>(id: number): Observable<TodoInterface> {
    const url = `${this.todosUrl}/?id=${id}`;
    return this.http.get<TodoInterface[]>(url)
      .pipe(
        map(todos => todos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} todo id=${id}`);
        }),
        catchError(this.handleError<TodoInterface>(`gettodo id=${id}`))
      );
  }

  getTodo(id: string): Observable<TodoInterface> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<TodoInterface>(url).pipe(
      tap((todo) => {
        console.log('Fetched todo: ', todo);
      }),
      catchError(this.handleError<TodoInterface>(`getTodo id='${id}`))
    )
  }

  changeFilter(filterName: FilterEnum) {
    this.filter$.next(filterName);
  }

  toggleAll(isCompleted: boolean) {
    const updatedTodos: TodoInterface[] = this.todos$.getValue().map((todo) => ({
      ...todo,
      isCompleted,
    }));
    this.updateTodos(updatedTodos);
    this.todos$.next(updatedTodos);
  }


  updateTodos(updatedTodos: TodoInterface[]): void {
    updatedTodos.forEach(td => {
      this.updateTodo(td);
    })
  }

  updateTodo(updatedTodo: TodoInterface) {
    this.http.put<TodoInterface>(this.todosUrl, updatedTodo, this.httpOptions).pipe(
      take(1),
      tap((_) => {
          //console.log('updated todo', updatedTodo);
          this.updateInternalTodos(updatedTodo);
        }
      ),
      catchError(this.handleError<any>('updateTodo'))
    ).subscribe();
  }

  toggleTodo(todo: TodoInterface): void {
    this.updateTodo(todo);
  }

  deleteTodo(id: string) {
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete<TodoInterface>(url, this.httpOptions).pipe(
      take(1),
      tap(_ => {
        const updatedTodos = this.todos$.getValue().filter((todo) => todo.id !== id);
        this.todos$.next(updatedTodos);
        this.log(`deleted todo id=${id}`);
      }),
      catchError(this.handleError<TodoInterface>('deletetodo'))
    ).subscribe();

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    //todo: we can log errors on the backend, later
    console.log(message);
  }

  private updateInternalTodos(updatedTodo: TodoInterface) {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === updatedTodo.id) {
        return {...todo, isCompleted:  updatedTodo.isCompleted, text: updatedTodo.text};
      }
      return todo;
    });
    this.todos$.next(updatedTodos);
  }
}
