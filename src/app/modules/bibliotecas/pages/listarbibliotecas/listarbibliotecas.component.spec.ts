import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarbibliotecasComponent } from './listarbibliotecas.component';

describe('ListarbibliotecasComponent', () => {
  let component: ListarbibliotecasComponent;
  let fixture: ComponentFixture<ListarbibliotecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarbibliotecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarbibliotecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
