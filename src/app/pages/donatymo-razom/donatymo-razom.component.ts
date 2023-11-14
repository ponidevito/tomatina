import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donatymo-razom',
  templateUrl: './donatymo-razom.component.html',
  styleUrls: ['./donatymo-razom.component.scss'],
})
export class DonatymoRazomComponent implements OnInit {
  counterValue: number = 1378167;
  targetValue: number = 2756333.8;
  duration: number = 4000; 

  ngOnInit() {
    this.animateCounter();
  }

  animateCounter() {
    const startTime = new Date().getTime();
    const endTime = startTime + this.duration;

    const updateCounter = () => {
      const currentTime = new Date().getTime();
      const progress = Math.min(1, (currentTime - startTime) / this.duration);
      this.counterValue = Math.floor(this.targetValue * progress);

      if (currentTime < endTime) {
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  }
}
