import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMainComponent } from './pokemon-main-component';

describe('PokemonMainComponent', () => {
  let component: PokemonMainComponent;
  let fixture: ComponentFixture<PokemonMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonMainComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
