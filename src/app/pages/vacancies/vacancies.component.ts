import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss'],
})
export class VacanciesComponent implements OnInit {
  constructor(
    private titleService: Title,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Вакансії');
    this.loadData();
  }
  loadData(): void {
    this.spinnerService.show(); // Show spinner before starting async operations
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }
}
