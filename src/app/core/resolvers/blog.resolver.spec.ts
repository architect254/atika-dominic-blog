import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { blogResolver } from './blog.resolver';

describe('blogResover', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => blogResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
