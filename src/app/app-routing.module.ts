import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos/components/todo.components';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./todos/components/todo.components').then(
        (m) => m.TodosComponent
      ),
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./todos/components/todo.components').then(
        (m) => m.TodosComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
