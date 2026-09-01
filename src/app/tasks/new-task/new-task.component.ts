import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTaskComponent {
  userId = input.required<string>();
  close = output<void>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private tasksService = inject(TasksService);

  onCancel() {
    this.close.emit();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId(),
    );
    this.close.emit();
  }
}
