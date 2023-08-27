import { Component, ElementRef, HostListener } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private elRef: ElementRef) {}

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

    // burger menu
    burger() {
      this.show = !this.show;
      this.layer = !this.layer;
      const body = document.getElementsByTagName('body')[0];
      body.classList.toggle('lockBurger');
    }

    
  //  close
  closeBlock() {
    this.show = false;
    this.layer = false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('lockBurger');
  }

}
