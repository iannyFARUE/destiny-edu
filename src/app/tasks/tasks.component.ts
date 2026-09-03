import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './tasks.service';

export type TaskFilter = 'open' | 'completed' | 'all';

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
  filter = signal<TaskFilter>('open');

  private tasksService = inject(TasksService);

  private userTasks = computed(() =>
    this.tasksService.allTasks().filter((task) => task.userId === this.userId()),
  );

  openCount = computed(() => this.userTasks().filter((task) => !task.completed).length);
  completedCount = computed(() => this.userTasks().filter((task) => task.completed).length);

  selectedUserTasks = computed(() => {
    const filter = this.filter();

    return this.userTasks()
      .filter((task) =>
        filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed,
      )
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  });

  onSetFilter(filter: TaskFilter) {
    this.filter.set(filter);
  }

  onStartAddTask() {
    this.isAddingTask.set(true);
  }

  onCloseAddTask() {
    this.isAddingTask.set(false);
  }
}
