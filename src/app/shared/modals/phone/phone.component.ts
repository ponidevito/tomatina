import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Street } from '../../interfaces/adressDelivery.interface';


@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
})
export class PhoneComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private fb: FormBuilder,
  ) {}

  public reviewForm!: FormGroup;
  public selectedStreet!: string;


  ngOnInit(): void {
    this.initReviewForm();
  }

  initReviewForm(): void {
    this.reviewForm = this.fb.group({

    });
  }

  streets: Street[] = [
    {
      value: 'Ресторан за адресою',
      viewValue: 'Ресторан за адресою',
      disabled: true,
    },
    { value: 'ТРЦ Victoria Gardens, Кульпарківська, 226 А', viewValue: 'ТРЦ Victoria Gardens, Кульпарківська, 226 А' },
    { value: 'СТРЦ Spartak, Мазепи, 1Б', viewValue: 'СТРЦ Spartak, Мазепи, 1Б' },
    { value: 'ТРЦ Forum Lviv, Під Дубом, 7Б', viewValue: 'ТРЦ Forum Lviv, Під Дубом, 7Б' },
    { value: 'ТРЦ King Cross, Стрийська, 30', viewValue: 'ТРЦ King Cross, Стрийська, 30' },
  ];

}
