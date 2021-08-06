import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaClienteComponent } from './adiciona-cliente.component';

describe('AdicionaClienteComponent', () => {
  let component: AdicionaClienteComponent;
  let fixture: ComponentFixture<AdicionaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionaClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
