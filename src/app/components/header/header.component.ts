import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/shared/modals/login/login.component';
import { DeliveryModalComponent } from '../../shared/modals/delivery/delivery-modal/delivery-modal.component';
import { DataService } from '../../shared/services/dataService/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private elRef: ElementRef,
    private dialog: MatDialog,
    private dataService: DataService
  ) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const menuBlock = this.elRef.nativeElement.querySelector('.menu-block');
    const burger = this.elRef.nativeElement.querySelector('#burger');

    if (!menuBlock.contains(event.target) && !burger.contains(event.target)) {
      this.closeBlock();
    }
  }

  public show = false;
  public layer = false;

  public message = 'натисніть для заміни';
  // burger menu
  burger() {
    this.show = !this.show;
    this.layer = !this.layer;
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('lockBurger');
  }

  ngOnInit(): void {
    this.dataService.changeMessage(this.message);
    this.dataService.currentMessage.subscribe((message) => {
      this.message = message;
    });
  }

  //  close
  closeBlock() {
    this.show = false;
    this.layer = false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('lockBurger');
  }

  //  open modal login
  openModalLogin() {
    this.dialog.open(LoginComponent);
  }

  //  open modal delivery
  openModalDelivery() {
    this.dialog.open(DeliveryModalComponent);
  }
}
