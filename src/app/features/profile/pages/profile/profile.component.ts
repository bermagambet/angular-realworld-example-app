import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { UserService } from "../../../../core/auth/services/user.service";
import { Profile } from "../../models/profile.model";
import { ProfileService } from "../../services/profile.service";
import { AsyncPipe, NgIf } from "@angular/common";
import { FollowButtonComponent } from "../../components/follow-button.component";
import { mockUser } from "./mockUser"; 

@Component({
  selector: "app-profile-page",
  template: `
    <ng-container *ngIf="!isWrongUser; else wrongUserTemplate">
      <!-- Если пользователь правильный (smth), показываем профиль -->
      <div class="profile-page">
        <h1>{{ profile.username }}</h1>
        <p>{{ profile.bio }}</p>
        <img [src]="profile.image" alt="Profile Image" />

        <!-- Остальная логика отображения профиля -->
        <!-- Например, кнопка follow/unfollow -->
        <app-follow-button
          [profile]="profile"
          (toggle)="onToggleFollowing($event)"
        ></app-follow-button>
      </div>
    </ng-container>

    <ng-template #wrongUserTemplate>
      <!-- Если имя пользователя не smth, показываем "Wrong user" -->
      <p>Wrong user</p>
    </ng-template>
  `,
  imports: [
    FollowButtonComponent,
    NgIf,
    RouterLink,
    AsyncPipe,
    RouterLinkActive,
    RouterOutlet,
  ],
  standalone: true,
})
export class ProfileComponent implements OnInit {
  profile!: Profile;
  isUser: boolean = false;
  isWrongUser: boolean = false;
  destroyRef = inject(DestroyRef);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}

  ngOnInit() {
    const username = this.route.snapshot.params["username"];
    if (username === "smth") {
  
      this.profile = mockUser;
     
      this.userService.currentUser.subscribe((user) => {
        this.isUser = user?.username === mockUser.username;
      });
    } else {
  
      this.isWrongUser = true;
    }
  }
  onToggleFollowing(profile: Profile) {
    this.profile = profile;
  }
}
