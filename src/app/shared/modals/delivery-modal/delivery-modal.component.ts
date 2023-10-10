import { Component } from '@angular/core';
import { DataService } from '../../services/dataService/data.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delivery-modal',
  templateUrl: './delivery-modal.component.html',
  styleUrls: ['./delivery-modal.component.scss'],
})
export class DeliveryModalComponent {
  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<DeliveryModalComponent>
  ) {}
  message: string = 'Доставка кур’єром'; // Початковий текст

  onClickLink(newText: string) {
    this.message = newText;
    this.dataService.changeMessage(this.message);
    this.dialogRef.close();
  }
}
