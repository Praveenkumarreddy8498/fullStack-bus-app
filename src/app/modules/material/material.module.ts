import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';


// import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatListModule
    
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatSelectModule,
    MatAutocompleteModule,
    // NgxMatDatetimePickerModule,
    // NgxMatTimepickerModule,
    MatDialogModule,
    MatListModule

  ],
})
export class MaterialModule {}
