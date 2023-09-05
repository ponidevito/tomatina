// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AdminCategoryComponent } from './admin-category.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { CategoryService } from 'src/app/shared/services/category/category.service';
// // import { ImageService } from 'src/app/shared/services/image/image.service';
// import {
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   ReactiveFormsModule,
// } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { of } from 'rxjs';
// import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';

// class MockCategoryService {}

// describe('AdminCategoryComponent', () => {
//   let component: AdminCategoryComponent;
//   let fixture: ComponentFixture<AdminCategoryComponent>;
//   let categoryService: CategoryService;
//   let imageService: ImageService;
//   let fb: FormBuilder;
//   let toastrService: ToastrService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, HttpClientTestingModule],
//       declarations: [AdminCategoryComponent],
//       providers: [
//         {
//           provide: ImageService,
//           useValue: {
//             uploadFile: () => Promise.resolve('image-url'),
//             deleteUploadFile: () => Promise.resolve({}),
//             progress$: of(100),
//           },
//         },
//         { provide: FormBuilder, useValue: new FormBuilder() },
//         { provide: ToastrService, useValue: { success: () => {} } },
//         { provide: CategoryService, useClass: MockCategoryService },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AdminCategoryComponent);
//     component = fixture.componentInstance;
//     categoryService = TestBed.inject(CategoryService);
//     imageService = TestBed.inject(ImageService);
//     fb = TestBed.inject(FormBuilder);
//     toastrService = TestBed.inject(ToastrService);
//     component.initActionForm();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize an empty category form', () => {
//     expect(component.categoryForm.value).toEqual({
//       name: null,
//       path: null,
//       image: null,
//     });
//   });

//   it('should open the category form on button click', () => {
//     component.showForm = false;
//     component.openCategory();
//     expect(component.showForm).toBe(true);
//   });
//   it('should close category form on openCategory method if already open', () => {
//     component.showForm = true;
//     component.openCategory();
//     expect(component.showForm).toBeFalse();
//   });
//   it('should set edit status and current category id on editCategory method', () => {
//     const action: ICategoryResponse = {
//       id: 1,
//       name: 'Category 1',
//       path: 'category-1',
//       image: 'image-1.jpg',
//     };

//     component.editCategory(action);
//     expect(component.editStatus).toBeTrue();
//     expect(component.currentCategoryId).toEqual(action.id);
//   });
//   it('should close the category form on button click', () => {
//     component.showForm = true;
//     component.openCategory();
//     expect(component.showForm).toBe(false);
//   });
//   it('should return the value of a specific control in the form', () => {
//     component.categoryForm = new FormGroup({
//       id: new FormControl(),
//       name: new FormControl(),
//       path: new FormControl(),
//       image: new FormControl(),
//     });

//     component.categoryForm.setValue({
//       id: 1,
//       name: 'Category 1',
//       path: '/category-1',
//       image: '1.jpeg',
//     });

//     expect(component.valueByControl('name')).toBe('Category 1');
//   });
// });
