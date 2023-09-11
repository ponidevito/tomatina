import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule, } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE,MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


// capitalize
import { CapitalizePipe } from '../shared/pipes/capitalize/capitalize.pipe';




const MATERIAL = [
  MatExpansionModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatIconModule
  
];

// other modules
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CapitalizePipe,

  
  ],
  imports: [
    ...MATERIAL,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ...MATERIAL,
    FormsModule,
    ReactiveFormsModule,
    CapitalizePipe,
    NgxSpinnerModule,
    NgxMaskModule

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'uk-UA' },

  ],
})





export class SharedModule { }
