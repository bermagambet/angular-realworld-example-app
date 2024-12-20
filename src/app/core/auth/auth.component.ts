import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NgIf } from "@angular/common";
import { ListErrorsComponent } from "../../shared/components/list-errors.component";
import { Errors } from "../models/errors.model";
import { UserService } from "./services/user.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

interface AuthForm {
  email: FormControl<string>;
  password: FormControl<string>;
  username?: FormControl<string>;
}

@Component({
  selector: "app-auth-page",
  templateUrl: "./auth.component.html",
  imports: [RouterLink, NgIf, ListErrorsComponent, ReactiveFormsModule],
  standalone: true,
})
export default class AuthComponent implements OnInit {
  authType = "";
  title = "";
  errors: Errors = { errors: {} };
  isSubmitting = false;
  authForm: FormGroup<AuthForm>;
  destroyRef = inject(DestroyRef);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService,
  ) {
    this.authForm = new FormGroup<AuthForm>({
      email: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  ngOnInit(): void {
    this.authType = this.route.snapshot.url.at(-1)!.path;
    this.title = this.authType === "login" ? "Sign in" : "Sign up";
    if (this.authType === "register") {
      this.authForm.addControl(
        "username",
        new FormControl("", {
          validators: [Validators.required],
          nonNullable: true,
        }),
      );
    }
  }

  submitForm(): void { // you need this for Task 2
    this.isSubmitting = true;
    this.errors = { errors: {} };
    let observable;

  if (this.authType === "login") {
    observable = this.userService.login({
      email: this.authForm.value.email!,
      password: this.authForm.value.password!,
    });
  } else {
    observable = this.userService.register({
      email: this.authForm.value.email!,
      password: this.authForm.value.password!,
      username: this.authForm.value.username!,
    });
  }

  observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
    next: () => void this.router.navigate(["/"]),
    error: (err) => {
      this.errors = err;
      this.isSubmitting = false;
    },
  });
  }
}
