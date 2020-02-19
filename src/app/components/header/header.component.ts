import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { map, tap } from 'rxjs/operators';
import { empty } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService) {
  }

  get url(): string {
    return this.router.url;
  }

  ngOnInit(): void {
  }
  getUserName() {
    const name = this.auth.getUser();
    return name != null ? name.displayName : 'User Name';
  }

  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['./login']);
      })
      .catch((error) => {
        alert(error);
      });
  }

}
