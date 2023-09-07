import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoodsService } from '../../shared/services/goods/goods.service';
import { IGoodsResponse } from '../../shared/interfaces/goods.inteface';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-goods',
  templateUrl: './admin-goods.component.html',
  styleUrls: ['./admin-goods.component.scss'],
})
export class AdminGoodsComponent implements OnInit {
  goodsList: any;
  constructor(
    public GoodsService: GoodsService,
    private fb: FormBuilder,
    private ImageService: ImageService,
    private categoryService: CategoryService,
    private toastService: ToastrService
  ) {}

  // FormGroup
  public goodsForm!: FormGroup;

  // goods array
  public adminGoods!: IGoodsResponse[];
  public adminCategories: Array<ICategoryResponse> = [];

  // id
  public currentGoodsId!: string | number;

  // show form
  public showForm = false;

  public isUploaded = false;
  public editStatus = false;

  // progress bar
  uploadPercent: number = 0;
  public progress!: number;

  // This code initializes a form in Angular using FormBuilder. It creates a group of form elements with fields for "category", "name","ingredients","weight","price" and "image" .
  initGoodsForm(): void {
    this.goodsForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      ingredients: [null],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      image: [null, Validators.required],
      count: [1],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.initGoodsForm();
    this.loadGoods();
  }

  // open button add goods (toggle)
  openGoods(): void {
    this.showForm = !this.showForm;
  }

  // This method loads a list of actions using the ActionService service, which uses an HTTP request to the server. By taking the data from the request, the method assigns the received data from the variable data to the array this.adminGoods.
  loadGoods(): void {
    this.GoodsService.getAllFirebase().subscribe((data) => {
      this.adminGoods = data as IGoodsResponse[];
    });
  }

  // This method loads all product categories using the categoryService and updates the value of the adminCategories variable, which contains a list of all product categories that were loaded.
  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe((data) => {
      this.adminCategories = data as ICategoryResponse[];
      if (this.adminCategories.length > 0) {
        this.goodsForm.patchValue({
          category: this.adminCategories[0].id,
        });
      }
    });
  }

  // add product
  addGoods(): void {
    if (this.editStatus) {
      this.GoodsService.updateFirebase(
        this.goodsForm.value,
        this.currentGoodsId as string
      ).then(() => {
        this.loadCategories();
        this.toastService.success('Продукт відредагований');
      });
    } else {
      this.GoodsService.createFirebase(this.goodsForm.value).then(() => {
        this.toastService.success('Продукт доданий!');
      });
    }
    this.editStatus = false;
    this.goodsForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.showForm = false;
  }

  openEdit(): void {
    this.showForm = true;
  }

  // This method uploads an image to the server when the user selects a file in the form.

  upload(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ImageService.uploadFile('images/products', file.name, file)
        .then((data) => {
          this.goodsForm.patchValue({
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

  // edit product
  editGoods(product: IGoodsResponse): void {
    this.goodsForm.patchValue({
      category: product.category,
      name: product.name,
      ingredients: product.ingredients,
      weight: product.weight,
      price: product.price,
      image: product.image,
    });

    this.editStatus = true;
    this.currentGoodsId = product.id;
    this.isUploaded = true;
  }

  // delete image from storage
  deleteImage(): void {
    this.ImageService.deleteUploadFile(this.valueByControl('image')).then(
      () => {
        console.log('File deleted');
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.goodsForm.patchValue({
          image: null,
        });
      }
    );
  }

  // delete goods
  deleteGoods(product: IGoodsResponse): void {
    this.GoodsService.deleteFirebase(product.id as string).then(() => {
      this.loadGoods();
      this.toastService.success('Продукт видалений');
    });
  }

  // This method returns the value of a field in the form by its name.
  valueByControl(control: string): string {
    return this.goodsForm.get(control)?.value;
  }
}
