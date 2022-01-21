import { TestBed } from '@angular/core/testing';

import { OrganisationSettingsService } from './organisation-settings.service';

describe('OrganisationSettingsService', () => {
  let service: OrganisationSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganisationSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
