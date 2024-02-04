import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElimiusuarioComponent } from './elimiusuario.component';

describe('ElimiusuarioComponent', () => {
  let component: ElimiusuarioComponent;
  let fixture: ComponentFixture<ElimiusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElimiusuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElimiusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
