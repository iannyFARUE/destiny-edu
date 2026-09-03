import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { type Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { DatePipe } from '@angular/common';
import { TasksService } from '../tasks.service';

function localIsoToday(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

@Component({
  selector: 'app-task',
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  task = input.required<Task>();
  private tasksService = inject(TasksService);

  isOverdue = computed(() => {
    const task = this.task();
    return !task.completed && task.dueDate < localIsoToday();
  });

  onToggleComplete() {
    this.tasksService.toggleTaskCompletion(this.task().id);
  }

  onDeleteTask() {
    this.tasksService.removeTask(this.task().id);
  }
}
