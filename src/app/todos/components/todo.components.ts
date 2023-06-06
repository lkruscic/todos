import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TodoService } from '../services/todos';
@Component({
  selector: 'app-todos-todos',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, TodoListComponent, RouterOutlet, RouterLink],
  providers: [TodoService],
  templateUrl: 'todo.component.html',
})
export class TodosComponent {}
