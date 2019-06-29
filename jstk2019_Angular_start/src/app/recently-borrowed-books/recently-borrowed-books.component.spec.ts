import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RecentlyBorrowedBooksComponent } from './recently-borrowed-books.component';

describe('RecentlyBorrowedBooksComponent', () => {
  let component: RecentlyBorrowedBooksComponent;
  let fixture: ComponentFixture<RecentlyBorrowedBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlyBorrowedBooksComponent ],
      imports: [ ReactiveFormsModule, RouterModule, HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyBorrowedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
