import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {TodoInterface} from "../types/todo.interface";

@Injectable({
  providedIn: 'root'
})
export class InMemoryTodosService implements InMemoryDbService {

  constructor() {
  }

  createDb() {
    const todos: TodoInterface[] = [
      {id: '1', text: 'todo 1', isCompleted: false},
      {id: '2', text: 'todo 2', isCompleted: false},
      {id: '3', text: 'todo 3', isCompleted: false},
      {id: '4', text: 'todo 4', isCompleted: false},
      {id: '5', text: 'todo 5', isCompleted: false}
    ];
    return {todos};
  }
}
