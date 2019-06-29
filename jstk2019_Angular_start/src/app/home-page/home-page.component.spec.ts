import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BookService } from '../services/book.service';
import { HomePageComponent } from './home-page.component';

class MockBookService {
  // tslint:disable-next-line:typedef
  sortBooks() {
    return of([]);
  }

  // tslint:disable-next-line:typedef
  getDistinctBooksFromSpecifiedBooks() {
    return ([]);
  }

  // tslint:disable-next-line:typedef
  filterAvailable() {
    return ([]);
  }

  // tslint:disable-next-line:typedef
  filterUnavailable() {
    return ([]);
  }

  // tslint:disable-next-line:typedef
  searchBooksByDetails() {
    return of([]);
  }
}

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let bookService: MockBookService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomePageComponent],
      imports: [ReactiveFormsModule, RouterModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: BookService, useClass: MockBookService}
      ]

    })
      .compileComponents();
    bookService = TestBed.get(BookService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    spyOn(bookService, 'sortBooks').and.returnValue(of([]));
    spyOn(bookService, 'getDistinctBooksFromSpecifiedBooks').and.returnValue([]);
    spyOn(bookService, 'filterAvailable').and.returnValue([]);
    spyOn(bookService, 'filterUnavailable').and.returnValue([]);
    spyOn(bookService, 'searchBooksByDetails').and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sortBooks', async () => {
    // when
    fixture.whenStable().then(() => {
      // then
      expect(bookService.sortBooks).toHaveBeenCalled();
    });
  });

  it('should assign values to distinctBooks after initalization', async () => {
    // given
    const expected = [];

    //when
    fixture.whenStable().then(() => {
      //then
      expect(component.distinctBooks).toEqual(expected);
    });
  });

  it('should assign values to AvailableBooks after initalization', async () => {
    // given
    const expected = [];

    //when
    fixture.whenStable().then(() => {
      //then
      expect(component.AvailableBooks).toEqual(expected);
    });
  });

  it('should assign values to UnavailableBooks after initalization', async () => {
    // given
    const expected = [];

    //when
    fixture.whenStable().then(() => {
      //then
      expect(component.UnavailableBooks).toEqual(expected);
    });
  });

  it('should check whether books are available', () => {
    // given
    const isbn = '';

    //when
    const actualValue = component.checkIsAvailable(isbn);

    //then
    expect(actualValue).toBeFalsy();
  });

  it('should check whether books are unavailable', () => {
    // given
    const isbn = '';

    //when
    const actualValue = component.checkIsUnavailable(isbn);

    //then
    expect(actualValue).toBeFalsy();
  });

  it('categories should be not empty', () => {
    //when
    const categories = component.categories();

    //then
    expect(categories).toBeTruthy();
  });

  it('should return categories from enum', () => {
    //given
    const expected = ['DRAMA', 'HORROR', 'FANTASY', 'BIOGRAPHY', 'NOVEL'];

    //when
    const categories = component.categories();

    //then
    expect(categories).toEqual(expected);
  });

  // tslint:disable-next-line:no-identical-functions
  it('should call getDistinctBooksFromSpecifiedBooks', async () => {
    // when
    fixture.whenStable().then(() => {
      // then
      expect(bookService.getDistinctBooksFromSpecifiedBooks).toHaveBeenCalled();
    });
  });

  // tslint:disable-next-line:no-identical-functions
  it('should call filterAvailable', async () => {
    // when
    fixture.whenStable().then(() => {
      // then
      expect(bookService.filterAvailable).toHaveBeenCalled();
    });
  });

  // tslint:disable-next-line:no-identical-functions
  it('should call filterUnavailable', async () => {
    // when
    fixture.whenStable().then(() => {
      // then
      expect(bookService.filterUnavailable).toHaveBeenCalled();
    });
  });

  // tslint:disable-next-line:no-identical-functions
  it('should call searchBooksByDetails', async () => {
    // when
    fixture.whenStable().then(() => {
      // then
      expect(bookService.searchBooksByDetails).toHaveBeenCalled();
    });
  });
});
