import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifusuarioComponent } from './modifusuario.component';

describe('ModifusuarioComponent', () => {
  let component: ModifusuarioComponent;
  let fixture: ComponentFixture<ModifusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifusuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
