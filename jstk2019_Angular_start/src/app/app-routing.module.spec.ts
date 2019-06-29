import { Location } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
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

describe('Router: App', () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        RouterModule,
        HttpClientTestingModule,
        RouterTestingModule],
      declarations: [
        HomePageComponent,
        BookDetailsComponent,
        AppComponent,
        AddBookComponent,
        BorrowBookComponent,
        ReturnBookComponent,
        HeaderComponent,
        RecentlyBorrowedBooksComponent,
        QuickSearchComponent]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });
  it('should create router', async(() => {
    //then
    expect(router).toBeTruthy();
  }));

  it('navigate to "" redirects you to \'/\'', async(() => {
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/');
    });
  }));

  // tslint:disable-next-line:no-identical-functions
  it('navigate to book-details takes you to \'/book/:isbn\'', async(() => {
    router.navigate(['/book/978-83-8125-414-4']).then(() => {
      expect(location.path()).toBe('/book/978-83-8125-414-4');
    });
  }));

  // tslint:disable-next-line:no-identical-functions
  it('navigate to add-book redirects you to \'/add\'', async(() => {
    router.navigate(['/add']).then(() => {
      expect(location.path()).toBe('/add');
    });
  }));

  // tslint:disable-next-line:no-identical-functions
  it('navigate to borrow-book redirects you to \'/borrow/:isbn\'', async(() => {
    router.navigate(['/borrow/978-83-8125-414-4']).then(() => {
      expect(location.path()).toBe('/borrow/978-83-8125-414-4');
    });
  }));

  // tslint:disable-next-line:no-identical-functions
  it('navigate to return-book redirects you to \'/return/:isbn\'', async(() => {
    router.navigate(['/return/978-83-8125-414-4']).then(() => {
      expect(location.path()).toBe('/return/978-83-8125-414-4');
    });
  }));

  // tslint:disable-next-line:no-identical-functions
  it('navigate to "" when you type whatever', async(() => {
    router.navigate(['cokolwiek']).then(() => {
      expect(location.path()).toBe('/');
    });
  }));

  it('async works', async(() => {
    const obs = of(true);
    const done = false;
    obs.subscribe(value => {
      expect(value).toBeTruthy();
    });
  }));
});
