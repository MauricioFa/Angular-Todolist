import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './pages/demo/demo.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  {path: '', component: DemoComponent},
  {path: '/demo', component: DemoComponent},
  {path: '/login', component: LoginComponent},
  {path: '/main', component: MainComponent},
  {path: '/register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
