import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterEnum } from '../../types/filter.enum';
import { TodoService } from '../../services/todos';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: [],
})
export class FooterComponent {
  activeCount$: Observable<number>;
  noTodosClass$: Observable<boolean>;
  itemsLeftText$: Observable<string>;
  filterEnum = FilterEnum;
  filter$: Observable<FilterEnum>;

  constructor(private todoService: TodoService) {
    this.activeCount$ = this.todoService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.noTodosClass$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => ` item${activeCount !== 1 ? 's' : ''} left`)
    );
    this.filter$ = this.todoService.filter$;
  }

  changeFilter(event: Event, filterName: FilterEnum) {
    event.preventDefault();
    this.todoService.changeFilter(filterName);
  }
}
