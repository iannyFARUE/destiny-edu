import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { type User } from './user.model';
import { TasksService } from '../tasks/tasks.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  user = input.required<User>();
  selected = input.required<boolean>();
  userSelected = output<string>();

  private tasksService = inject(TasksService);

  imagePath = computed(() => 'assets/users/' + this.user().avatar);

  openTaskCount = computed(
    () =>
      this.tasksService
        .allTasks()
        .filter((task) => task.userId === this.user().id && !task.completed).length,
  );

  onSelectUser(): void {
    this.userSelected.emit(this.user().id);
  }
}
