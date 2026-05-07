import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetByIdPokemon } from './get-by-id-pokemon';

describe('GetByIdPokemon', () => {
  let component: GetByIdPokemon;
  let fixture: ComponentFixture<GetByIdPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetByIdPokemon],
    }).compileComponents();

    fixture = TestBed.createComponent(GetByIdPokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
