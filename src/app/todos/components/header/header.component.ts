import { Component } from '@angular/core';
import { TodoService } from '../../services/todos';

@Component({
  selector: 'app-todos-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent {
  text: string = '';

  constructor(private todoService: TodoService) {}

  changeText(event: Event): void {
    this.text = (event.target as HTMLInputElement).value;
  }
  addTask(): void {
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}
