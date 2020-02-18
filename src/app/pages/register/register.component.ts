import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  profileForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService) {
    this.profileForm = new FormGroup({
      name: new FormControl(''),
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

  // Validator messages
  getErrorMessageName() {
    if (this.profileForm.get('name').hasError('required')) {
      return 'You must enter a value';
    }
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

  // register firebase
  register(event: Event) {
    event.preventDefault();
    if (this.profileForm.valid) {
      const value = this.profileForm.value;
      this.authService.createUser(value.email, value.pass)
        .then(() => {
          this.router.navigate(['/login']);
          this.authService.getUser().updateProfile({
            displayName: value.name
          });
        })
        .catch((error) => {
          this.openSnackBar(error.message, 'Close');
        });
    }
  }

  ngOnInit(): void {
  }

}
