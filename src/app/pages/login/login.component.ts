import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  hide = true; // default password hide
  profileForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService) {
    this.profileForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl(''),
    });
  }

  // snackbar if rejected register
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  getErrorMessageEmail() {
    return this.profileForm.get('email').hasError('required') ? 'You must enter a value' :
      this.profileForm.get('email').hasError('email') ? 'Not a valid email' :
        '';
  }

  getErrorMessagePassword() {
    if (this.profileForm.get('pass').hasError('required')) {
      return 'You must enter a value';
    }
  }
  // login firebase
  loginUser(event: Event) {
    event.preventDefault();
    if (this.profileForm.valid) {
      const value = this.profileForm.value;
      this.authService.loginUser(value.email, value.pass)
        .then(() => {
          this.router.navigate(['/main']);
        })
        .catch((error) => {
          this.openSnackBar(error.message, 'Close');
        });
    }
  }

  ngOnInit(): void {
  }
}
