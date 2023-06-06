import { Component } from '@angular/core';
import { TodoService } from '../../services/todos';
import { combineLatest, Observable } from 'rxjs';
import { TodoInterface } from '../../types/todo.interface';
import { map } from 'rxjs/operators';
import { FilterEnum } from '../../types/filter.enum';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: [],
})
export class TodoListComponent {
  noTodosClass$: Observable<boolean>;
  isAllTodosSelected$: Observable<boolean>;
  editingId: string | null = null;
  visibleTodos$: Observable<TodoInterface[]>;

  constructor(private todosService: TodoService) {
    this.noTodosClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    this.isAllTodosSelected$ = this.todosService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    );
    this.visibleTodos$ = combineLatest([
      this.todosService.todos$,
      this.todosService.filter$,
    ]).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      })
    );
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }
}
