import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { type User } from './user.model';

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

  imagePath = computed(() => 'assets/users/' + this.user().avatar);

  onSelectUser(): void {
    this.userSelected.emit(this.user().id);
  }
}
