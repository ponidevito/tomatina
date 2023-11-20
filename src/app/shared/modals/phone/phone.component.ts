import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Street } from '../../interfaces/adressDelivery.interface';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { IReviewResponse } from '../../interfaces/reviews.interface';
import { ReviewService } from '../../services/review/review.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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
    private reviewService: ReviewService,
    private dialogRef: MatDialogRef<PhoneComponent>,
    private toastService: ToastrService
  ) {}

  public count = 0;
  public reviewForm!: FormGroup;
  public selectedStreet!: string;
  public review!: string | number;

  public reviewsArray: Array<IReviewResponse> = [];

  public isUploaded = false;
  // progress bar
  uploadPercent: number = 0;
  public progress!: number;

  ngOnInit(): void {
    this.initReviewForm();
    this.loadReviews();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.reviewForm.patchValue({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    });
  }

  initReviewForm(): void {
    this.reviewForm = this.fb.group({
      id: this.count + 1,
      count: this.count + 1,
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      selectedStreet: [this.streets[0].value, Validators.required],
      rating: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      date: this.formatDateWithSpaces(),
      review: this.review,
      fileUpload: new FormControl(),
      image: [null],
    });
  }

  loadReviews(): void {
    this.reviewService.getAllFirebase().subscribe((data) => {
      this.reviewsArray = data as IReviewResponse[]; // Додайте нові відгуки на початок масиву
      this.reviewsArray.sort((a, b) => b.count - a.count);
      this.countOrder();
    });
  }

  formatDateWithSpaces(): string {
    const myDate = new Date();
    const day = myDate.getDate().toString().padStart(2, '0');
    const month = (myDate.getMonth() + 1).toString().padStart(2, '0');
    const hours = myDate.getHours().toString().padStart(2, '0');
    const minutes = myDate.getMinutes().toString().padStart(2, '0');
    const date = `${day}.${month}. ${hours}.${minutes}`;
    const [dayMonth, hoursMinutes] = date.split(' ');
    const [dayl, monthl] = dayMonth.split('.');
    return `${dayl}.${monthl}. ${hoursMinutes}`;
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

  countOrder(): void {
    this.reviewService.getAllFirebase().subscribe((data) => {
      this.count = data.length;
    });
  }

  addForm(): void {
    const formValuesReviews = this.reviewForm.value;

    // Отримання даних для нового відгуку
    const newReview: any = {
      firstName: formValuesReviews.firstName,
      lastName: formValuesReviews.lastName,
      selectedStreet: formValuesReviews.selectedStreet,
      rating: formValuesReviews.rating,
      email: formValuesReviews.email,
      date: this.formatDateWithSpaces(),
      review: formValuesReviews.review,
      image: formValuesReviews.image,
    };

    // Перевірка наявності числових значень 'count' та знаходження максимального значення
    const counts = this.reviewsArray
      .filter((item) => !isNaN(item.count))
      .map((item) => item.count);

    // Обчислення максимального значення 'count' для нового відгуку
    const maxCount = counts.length > 0 ? Math.max(...counts) : 0;
    newReview.count = maxCount + 1;

    // Додавання нового відгуку
    this.reviewService.createFirebase(newReview).then(() => {
      this.toastService.success('Відгук доданий!');
    });

    // Скидання форми
    this.reviewForm.reset();
  }

  // This method returns the value of a field in the form by its name.
  valueByControl(control: string): string {
    return this.reviewForm.get(control)?.value;
  }
}
