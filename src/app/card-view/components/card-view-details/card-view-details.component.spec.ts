import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewDetailsComponent } from './card-view-details.component';

describe('CardViewDetailsComponent', () => {
  let component: CardViewDetailsComponent;
  let fixture: ComponentFixture<CardViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
