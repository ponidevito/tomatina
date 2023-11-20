import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import {
  ICategory,
  ICategoryResponse,
} from '../../shared/interfaces/category.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit {
  constructor(
    public CategoryService: CategoryService,
    private ImageService: ImageService,
    private fb: FormBuilder,
    private toastService: ToastrService
  ) {}

  // array category
  public adminCategory: Array<ICategoryResponse> = [];

  // FormGroup
  public categoryForm!: FormGroup;

  public isUploaded = false;
  public editStatus = false;

  // id
  public currentCategoryId!: string | number;

  // hsow form
  public showForm = false;

  // progress bar
  uploadPercent: number = 0;
  public progress!: number;
  // This code initializes a form in Angular using FormBuilder. It creates a group of form elements with fields for "name", "route", and "image".
  initActionForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      image: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.initActionForm();
    this.loadCategories();
  }

  // This method loads a list of actions using the CategoryService service, which uses an HTTP request to the server. By taking the data from the request, the method assigns the received data from the variable data to the array this.category.
  loadCategories(): void {
    this.CategoryService.getAllFirebase().subscribe((data) => {
      this.adminCategory = data as ICategoryResponse[];
    });
  }

  // open button add category (toggle)
  openCategory(): void {
    this.showForm = !this.showForm;
  }
  // open button edit action
  openEdit(): void {
    this.showForm = true;
  }

  // add category
  addCategory(): void {
    if (this.editStatus) {
      this.CategoryService.updateFirebase(
        this.categoryForm.value,
        this.currentCategoryId as string
      ).then(() => {
        this.loadCategories();
        this.toastService.success('Category successfully updated');
      });
    } else {
      this.CategoryService.createFirebase(this.categoryForm.value).then(() => {
        this.toastService.success('Category successfully created');
      });
    }
    this.toastService.success('Категорія додана!');
    this.editStatus = false;
    this.categoryForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.showForm = false;
  }

  // This method uploads an image to the server when the user selects a file in the form.
  upload(event: any): void {
    const file = event.target.files[0];
    this.ImageService.uploadFile('images/category', file.name, file)
      .then((data) => {
        this.categoryForm.patchValue({
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

  // edit category
  editCategory(action: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: action.name,
      path: action.path,
      image: action.image,
    });
    this.editStatus = true;
    this.currentCategoryId = action.id;
    this.isUploaded = true;
  }

  // delete image from firebase
  deleteImage(): void {
    this.ImageService.deleteUploadFile(this.valueByControl('image')).then(
      () => {
        console.log('File deleted');
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.categoryForm.patchValue({
          image: null,
        });
      }
    );
  }

  // delete category
  deleteCategory(category: ICategoryResponse): void {
    this.CategoryService.deleteFirebase(category.id as string).then(() => {
      this.loadCategories();
      this.toastService.success('Category successfully deleted');
    });
  }

  // This method returns the value of a field in the form by its name.
  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }
}
