import { TestBed } from '@angular/core/testing';
import { CategoryService } from '../category/category.service';
import { Firestore } from '@angular/fire/firestore';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockCategoryService {
  getAllFirebase() {
    return [];
  }
}

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [{ provide: CategoryService, useValue: {MockCategoryService }} ,
      ],
    });
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

