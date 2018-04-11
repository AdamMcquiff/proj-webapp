import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { HttpService } from './http.service';

describe('HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService, HttpClientModule]
    });
  });

  it('should be created', inject([HttpService, HttpClientModule], (service: HttpService, client: HttpClientModule) => {
    expect(service).toBeTruthy();
  })); 
});
 