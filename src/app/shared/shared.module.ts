import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule, } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';







const MATERIAL = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
];

// other modules
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryModalComponent } from './modals/delivery/delivery-modal/delivery-modal.component';


@NgModule({
  declarations: [
  
  
    DeliveryModalComponent
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
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'uk-UA' },

  ],
})





export class SharedModule { }
