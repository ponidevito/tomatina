import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Street } from '../../interfaces/adressDelivery.interface';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
})
export class PhoneComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private fb: FormBuilder,
    private ImageService: ImageService,

  ) {}

  public reviewForm!: FormGroup;
  public selectedStreet!: string;
  public firstName!: string;
  public lastName!: string;
  public review!: string | number;

  public isUploaded = false;
  // progress bar
  uploadPercent: number = 0;
  public progress!: number;

  ngOnInit(): void {
    this.initReviewForm();
  }

  initReviewForm(): void {
    this.reviewForm = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      selectedStreet: [this.streets[0].value],
      rating: [''],
      review: this.review,
      fileUpload: new FormControl()
    });
  }



  streets: Street[] = [
    {
      value: 'Ресторан за адресою',
      viewValue: 'Ресторан за адресою',
      disabled: true,
    },
    {
      value: 'с. Сокільники вул.Стрийська, 30',
      viewValue: 'с. Сокільники вул.Стрийська, 30',
    },
    {
      value: 'м. Львів Вул.Кульпарківська, 226 А',
      viewValue: 'м. Львів Вул.Кульпарківська, 226 А',
    },
    { value: 'м. Львів Вул.Мазепи, 1Б', viewValue: 'м. Львів Вул.Мазепи, 1Б' },
  ];

  activeHearts: number = 0; // Зберігає кількість активованих сердець

  setRating(index: number): void {
    this.activeHearts = index + 1; // Встановлює кількість активованих сердець
    this.reviewForm.get('rating')?.setValue(index + 1); // Встановлюємо значення рейтингу у формі
  }

  onMouseEnter(): void {
    const icons = document.querySelectorAll('.select-icon');
    icons.forEach((icon) => {
      icon.classList.add('hovered');
    });
  }

  isFilled(index: number): boolean {
    return index < this.activeHearts; // Повертає true для активних сердець
  }

  onMouseLeave(): void {
    const icons = document.querySelectorAll('.select-icon');
    icons.forEach((icon) => {
      icon.classList.remove('hovered');
    });
  }

  upload(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ImageService.uploadFile('images/reviews', file.name, file)
        .then((data) => {
          this.reviewForm.patchValue({
            image: data,
          });
          this.isUploaded = true;
        })
        .catch((err) => {
          console.log(err);
        });

      this.ImageService.progress$.subscribe((progress) => {
        this.progress = progress;
      });

      this.ImageService.progress$.subscribe((percent) => {
        this.uploadPercent = percent;
      });
    }
  }

    // delete image from storage
    deleteImage(): void {
      this.ImageService.deleteUploadFile(this.valueByControl('image')).then(
        () => {
          console.log('File deleted');
          this.isUploaded = false;
          this.uploadPercent = 0;
          this.reviewForm.patchValue({
            image: null,
          });
        }
      );
    }



  addForm(): void {
    // Отримайте значення форми і відправте їх на сервер або обробіть якщо потрібно
    console.log(this.reviewForm.value); // Приклад виводу даних у консоль
    this.reviewForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    // Ваш код для відправки даних
  }

    // This method returns the value of a field in the form by its name.
    valueByControl(control: string): string {
      return this.reviewForm.get(control)?.value;
    }
}
