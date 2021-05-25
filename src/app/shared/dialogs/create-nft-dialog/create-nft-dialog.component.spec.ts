import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNftDialogComponent } from './create-nft-dialog.component';

describe('CreateNftDialogComponent', () => {
  let component: CreateNftDialogComponent;
  let fixture: ComponentFixture<CreateNftDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNftDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNftDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
