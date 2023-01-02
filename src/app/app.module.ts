import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { TableViewComponent } from './components/table-view/table-view.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { ViewTableDataComponent } from './components/view-table-data/view-table-data.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { RouterModule } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { ListViewComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, TableViewComponent, ViewTableDataComponent, AddEditComponent, GridViewComponent, ListViewComponent],
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
