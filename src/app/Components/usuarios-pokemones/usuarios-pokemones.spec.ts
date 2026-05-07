import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosPokemones } from './usuarios-pokemones';

describe('UsuariosPokemones', () => {
  let component: UsuariosPokemones;
  let fixture: ComponentFixture<UsuariosPokemones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosPokemones],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosPokemones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
