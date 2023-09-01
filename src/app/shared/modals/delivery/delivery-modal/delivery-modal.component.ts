import { Component } from '@angular/core';
import { DataService } from '../../../services/dataService/data.service';


@Component({
  selector: 'app-delivery-modal',
  templateUrl: './delivery-modal.component.html',
  styleUrls: ['./delivery-modal.component.scss']
})
export class DeliveryModalComponent {
  constructor(private dataService: DataService) { }
  message: string = 'Доставка кур’єром'; // Початковий текст

  onClickLink(newText: string) {
    // При кліку на лінк змінюємо innerHTML в іншому компоненті
    this.message = newText; // Змінюємо обраний текст при кліку

    this.dataService.changeMessage(this.message);  }

}
