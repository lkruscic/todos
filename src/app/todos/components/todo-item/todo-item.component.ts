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
import {TodoService} from '../../services/todos';
import {TodoInterface} from '../../types/todo.interface';

@Component({
  selector: 'app-todo-item',
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

  constructor(private todosService: TodoService) {
  }

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
    this.todosService.deleteTodo(this.todoProps.id);
  }

  toggleTodo(): void {
    const td = {...this.todoProps, isCompleted: !this.todoProps.isCompleted}
    this.todosService.toggleTodo(td);
  }

  setTodoInEditingMode(): void {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo(): void {
    this.todoProps.text = this.editingText;
    this.todosService.updateTodo(this.todoProps);
    this.setEditingIdEvent.emit(null);
  }
}
