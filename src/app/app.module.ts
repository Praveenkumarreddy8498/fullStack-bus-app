import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { ViewTableComponent } from './components/view-table/view-table.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridViewComponent } from './components/grid-view/grid-view.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, ViewTableComponent, AddEditComponent, GridViewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    MatGridListModule,
    FlexLayoutModule
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
