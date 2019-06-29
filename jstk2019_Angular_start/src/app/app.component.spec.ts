import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AddBookComponent } from './add-book/add-book.component';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BorrowBookComponent } from './borrow-book/borrow-book.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import { RecentlyBorrowedBooksComponent } from './recently-borrowed-books/recently-borrowed-books.component';
import { ReturnBookComponent } from './return-book/return-book.component';

describe('AppComponent', () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        RouterModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        HomePageComponent,
        BookDetailsComponent,
        AddBookComponent,
        BorrowBookComponent,
        ReturnBookComponent,
        AppComponent,
        HeaderComponent,
        RecentlyBorrowedBooksComponent,
        QuickSearchComponent
      ]
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  }));

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
