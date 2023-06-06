import { Component } from '@angular/core';
import { TodoService } from '../../services/todos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos-header',
  standalone: true,
  imports: [CommonModule],
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
