import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {TodoListComponent} from './components/./todo-list/todo-list.component';
import {TodoItemComponent} from './components/todo-item/todo-item.component';
import {TodosComponent} from './components/todo.components';
import {RouterModule, Routes} from '@angular/router';
import {TodoService} from './services/todos';
import {InMemoryTodosService} from "./services/in-memory-todos.service";

const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  },
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TodosComponent,
    TodoListComponent,
    TodoItemComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [TodoService, InMemoryTodosService],
})
export class TodosModule {
}
