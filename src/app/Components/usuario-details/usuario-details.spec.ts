import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDetails } from './usuario-details';

describe('UsuarioDetails', () => {
  let component: UsuarioDetails;
  let fixture: ComponentFixture<UsuarioDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
