import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtikaDominicComponent } from './atika-dominic.component';

describe('AtikaDominicComponent', () => {
  let component: AtikaDominicComponent;
  let fixture: ComponentFixture<AtikaDominicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtikaDominicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtikaDominicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
