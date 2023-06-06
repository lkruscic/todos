import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TodoListComponent } from './components/./todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodosComponent } from './components/todo.components';
import { Route, RouterModule, Routes } from '@angular/router';
import { TodoService } from './services/todos';

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
  providers: [TodoService],
})
export class TodosModule {}
