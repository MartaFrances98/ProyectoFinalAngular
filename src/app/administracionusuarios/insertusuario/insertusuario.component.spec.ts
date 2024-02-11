import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertusuarioComponent } from './insertusuario.component';

describe('InsertusuarioComponent', () => {
  let component: InsertusuarioComponent;
  let fixture: ComponentFixture<InsertusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertusuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
