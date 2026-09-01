import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy-users';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  users = DUMMY_USERS;
  selectedUserId = signal<string | undefined>(undefined);

  selectedUser = computed(() => this.users.find((user) => user.id === this.selectedUserId()));

  onSelectUser(id: string) {
    this.selectedUserId.set(id);
  }
}
