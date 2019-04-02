import { TestBed } from '@angular/core/testing';

import { RestaurantService } from './rstrnt.service';

describe('RstrntService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestaurantService = TestBed.get(RestaurantService);
    expect(service).toBeTruthy();
  });
});
