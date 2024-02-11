import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionusuariosComponent } from './administracionusuarios.component';

describe('AdministracionusuariosComponent', () => {
  let component: AdministracionusuariosComponent;
  let fixture: ComponentFixture<AdministracionusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministracionusuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministracionusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
