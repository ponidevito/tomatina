import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { CvService } from '../../../shared/services/cv/cv.service';
import { Title } from '@angular/platform-browser';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-kuhar-liniyi-vydachi',
  templateUrl: './kuhar-liniyi-vydachi.component.html',
  styleUrls: ['./kuhar-liniyi-vydachi.component.scss']
})
export class KuharLiniyiVydachiComponent {
  constructor(private fb: FormBuilder,private router: Router, private ImageService: ImageService, private cvService: CvService, private titleService: Title,
    private toastService: ToastrService,
    ) {
  }

  public cvForm!: FormGroup;
  public review!: string | number;
  public vacancie!: string;
  public isUploaded = false;
  // progress bar
  uploadPercent: number = 0;
  public progress!: number;

  ngOnInit(): void {
    this.initCvForm();
    this.titleService.setTitle('Вакансія Кухар лінії видачі');
  }


  initCvForm(): void {
    this.cvForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      review:[this.review ,Validators.required],
      date: this.formatDateWithSpaces(),
      fileUpload: new FormControl(),
      image: [null ,Validators.required],
      vacancie: 'kuhar-liniyi-vydachi',
    });
  }

  addForm(): void {
    const formValuesCv = this.cvForm.value;

    // Отримання даних для нового відгуку
    const newReview: any = {
      firstName: formValuesCv.firstName,
      lastName: formValuesCv.lastName,
      email: formValuesCv.email,
      date: this.formatDateWithSpaces(),
      review: formValuesCv.review,
      image: formValuesCv.image,
      vacancie: 'kuhar-liniyi-vydachi',
    };
    console.log(newReview);

    // Додавання нового відгуку
    this.cvService.createFirebase(newReview).then(() => {
      this.toastService.success('Ви відгукнулися на вакансію!!');
    });

    // Скидання форми
    this.cvForm.reset();
    this.cvForm.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      review: '',
      image: null, // або null, або відповідно до вашої логіки
    });
    this.isUploaded = false;
    this.uploadPercent = 0;

  }

  upload(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ImageService.uploadFile('images/cv', file.name, file)
        .then((data) => {
          this.cvForm.patchValue({
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
        this.cvForm.patchValue({
          image: null,
        });
      }
    );
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

  // This method returns the value of a field in the form by its name.
  valueByControl(control: string): string {
    return this.cvForm.get(control)?.value;
  }


}
