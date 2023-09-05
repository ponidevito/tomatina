import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Firestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';


class MockAccountService {
  isUserLogin$ = new BehaviorSubject<number>(0);
}
describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [{ provide: Firestore, useValue: {MockAccountService} }],

    });
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
