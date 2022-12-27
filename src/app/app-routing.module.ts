import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path:'',redirectTo: 'dashboard',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard],data:{roles: ["manager","editor","viewer"]}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
