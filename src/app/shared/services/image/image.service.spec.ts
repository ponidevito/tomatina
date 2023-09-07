import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';
import {  AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Storage } from '@angular/fire/storage';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ImageService', () => {
  let service: ImageService;
  let storageSpy: any;
 


  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('Storage', ['ref']);

    TestBed.configureTestingModule({
      imports: [AngularFireStorageModule, ],
      providers: [{ provide: Storage, useValue: {} }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(ImageService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
