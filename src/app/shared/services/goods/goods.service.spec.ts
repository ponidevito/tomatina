import { TestBed } from '@angular/core/testing';
import { GoodsService } from '../goods/goods.service';
import {
  HttpClientTestingModule,

} from '@angular/common/http/testing';


class MockGoodsService {
  getAllFirebase() {
    return [];
  }
}

describe('GoodsService', () => {
  let service: GoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      providers: [{ provide: GoodsService, useValue: { MockGoodsService } }],
    });
    service = TestBed.inject(GoodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
});
