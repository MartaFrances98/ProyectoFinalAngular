import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeditdeleteComponent } from './formeditdelete.component';

describe('FormeditdeleteComponent', () => {
  let component: FormeditdeleteComponent;
  let fixture: ComponentFixture<FormeditdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormeditdeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormeditdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
