import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewTableDataComponent } from './components/view-table-data/view-table-data.component';

const routes: Routes = [
  { path:'',redirectTo: '/dashboard',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard],data:{roles: ["manager","editor","viewer"]}},
  {path:'table-view',component:TableViewComponent,canActivate:[AuthGuard],data:{roles: ["manager","editor","viewer"]}},
  {path:'view-table-data/:id',component:ViewTableDataComponent,canActivate:[AuthGuard],data:{roles: ["manager","editor","viewer"]}},
  {path:'addForm',component:AddEditComponent,canActivate:[AuthGuard],data:{roles: ["manager","editor",]}},
  {path:'editForm/:id',component:AddEditComponent,canActivate:[AuthGuard],data:{roles: ["manager","editor"]}},
  {path:'grid-view',component:GridViewComponent,canActivate:[AuthGuard],data:{roles:["manager","editor","viewer"]}}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
