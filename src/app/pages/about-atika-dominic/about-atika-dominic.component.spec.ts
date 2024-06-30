import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAtikaDominicComponent } from './about-atika-dominic.component';

describe('AboutAtikaDominicComponent', () => {
  let component: AboutAtikaDominicComponent;
  let fixture: ComponentFixture<AboutAtikaDominicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutAtikaDominicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutAtikaDominicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
