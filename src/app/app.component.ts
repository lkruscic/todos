import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/components/todo.components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  standalone: true,
  imports: [RouterOutlet, RouterLink, TodosComponent]
})
export class AppComponent {}
