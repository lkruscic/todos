import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TodoService } from '../../services/todos';
import { TodoInterface } from '../../types/todo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrls: [],
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input('isEditing') isEditingProps!: boolean;
  @Input('todo') todoProps!: TodoInterface;

  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter<string | null>();

  @ViewChild('textInput') textInput!: ElementRef;
  editingText: string = '';
  constructor(private todosService: TodoService) {}
  ngOnInit() {
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus;
      }, 0);
    }
  }

  removeTodo(): void {
    this.todosService.removeTodo(this.todoProps.id);
  }

  toggleTodo(): void {
    this.todosService.toggleTodo(this.todoProps.id);
  }

  setTodoInEditingMode(): void {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo(): void {
    this.todosService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }
}
