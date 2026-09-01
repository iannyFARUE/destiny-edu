import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  name = input.required<string>();
  userId = input.required<string>();
  isAddingTask = signal(false);

  private tasksService = inject(TasksService);

  selectedUserTasks = computed(() =>
    this.tasksService.allTasks().filter((task) => task.userId === this.userId()),
  );

  onStartAddTask() {
    this.isAddingTask.set(true);
  }

  onCloseAddTask() {
    this.isAddingTask.set(false);
  }
}
