import { TestBed } from '@angular/core/testing';

import { AvailableItemsService } from './available-items.service';

describe('AvailableItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvailableItemsService = TestBed.get(AvailableItemsService);
    expect(service).toBeTruthy();
  });
});
