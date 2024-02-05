import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForminsertComponent } from './forminsert.component';

describe('ForminsertComponent', () => {
  let component: ForminsertComponent;
  let fixture: ComponentFixture<ForminsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForminsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForminsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
