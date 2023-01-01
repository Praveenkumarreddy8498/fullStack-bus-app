import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { audit } from 'rxjs';
import { AuthGuard } from './auth/auth.guard';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { ViewTableComponent } from './components/view-table/view-table.component';

const routes: Routes = [
  { path:'',redirectTo: '/dashboard',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard],data:{roles: ["manager","editor","viewer"]}},
  {path:'view-details/:id',component:ViewTableComponent,canActivate:[AuthGuard],data:{roles: ["manager","editor","viewer"]}},
  {path:'addForm',component:AddEditComponent,canActivate:[AuthGuard],data:{roles: ["manager","editor",]}},
  {path:'dashboard/editForm/:id',component:AddEditComponent,canActivate:[AuthGuard],data:{roles: ["manager","editor"]}},
  {path:'dashboard/grid-view',component:GridViewComponent,canActivate:[AuthGuard],data:{roles:["manager","editor","viewer"]}}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
