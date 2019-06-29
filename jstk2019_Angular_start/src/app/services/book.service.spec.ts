import { getTestBed, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Book } from '../book';
import { BookService } from './book.service';

// tslint:disable-next-line:no-big-function
describe('BookService', () => {
  let service: BookService;
  let injector: TestBed;
  let httpClient: HttpTestingController;
  const someBooks = [
    {
      id: 1,
      title: 'Java dla zielonych',
      author: 'Adrian Buller',
      description: 'Podręcznik do programowania',
      isbn: '978-83-7181-510-2',
      category: 'Drama',
      releaseDate: '1999-09-11',
      borrowDate: '2000-02-02',
      returnDate: '2019-06-08',
      addDate: '2005-03-14',
      cover: 'https://static01.helion.com.pl/helion/okladki/326x466/javkp9.jpg',
      publishingHouse: 'PWN',
      availability: true,
      email: ''
    }
  ];

  const allBooks = [
    {
      id: 1,
      title: 'Java dla zielonych',
      author: 'Adrian Buller',
      description: 'Podręcznik do programowania',
      isbn: '978-83-7181-510-2',
      category: 'Drama',
      releaseDate: '1999-09-11',
      borrowDate: '2000-02-02',
      returnDate: '2019-06-08',
      addDate: '2005-03-14',
      cover: 'https://static01.helion.com.pl/helion/okladki/326x466/javkp9.jpg',
      publishingHouse: 'PWN',
      availability: false,
      email: ''
    },
    {
      id: 2,
      title: 'Arek Blejwas i Angular z Azkabanu',
      author: 'Adrian Buller',
      description: 'Książka dokumentalna o historii pewnego starterkitowca',
      isbn: '978-83-7181-511-3',
      category: 'Drama',
      releaseDate: '1998-09-11',
      borrowDate: '2010-02-02',
      returnDate: '2019-06-08',
      addDate: '2005-01-02',
      cover: 'https://static01.helion.com.pl/global/okladki/326x466/c699b7f9758ad928df09bf00cfbf46eb,angupk.jpg',
      publishingHouse: 'PWN',
      availability: true,
      email: ''
    },
    {
      id: 3,
      title: 'Pan Tadeusz',
      author: 'Adam Mickiewicz',
      description: 'Lektura szkolna',
      isbn: '988-99-7181-510-2',
      category: 'Horror',
      releaseDate: '1993-09-11',
      borrowDate: '2005-02-02',
      returnDate: '2019-06-08',
      addDate: '2005-01-03',
      cover: 'https://image.ceneostatic.pl/data/products/109070/i-pan-tadeusz.jpg',
      publishingHouse: 'PWN',
      availability: true,
      email: ''
    },
    {
      id: 4,
      title: 'Czerwona Jaskółka',
      author: 'Jason Matthews ',
      description: 'Ciekawa książka dla znudzonych ludzi',
      isbn: '978-83-8031-993-6',
      category: 'Novel',
      releaseDate: '2018-05-21',
      borrowDate: '',
      returnDate: '',
      addDate: '2019-02-13',
      cover: 'https://ecsmedia.pl/c/czerwona-jaskolka-tom-1-w-iext52324609.jpg',
      publishingHouse: 'Świat książki',
      availability: true,
      email: ''
    },
    {
      id: 5,
      title: 'Harry Potter i Więzień Azkabanu',
      author: 'J.K. Rowling',
      description: 'Hocus pokus, czary mary ...',
      isbn: '978-83-8008-215-1',
      category: 'Fantasy',
      releaseDate: '2016-02-08',
      borrowDate: '',
      returnDate: '',
      addDate: '2019-02-11',
      cover: 'http://s.lubimyczytac.pl/upload/books/308000/308637/532904-352x500.jpg',
      publishingHouse: 'Media rodzina',
      availability: true,
      email: ''
    },
    {
      id: 6,
      title: 'Harry Potter i Insygnia Śmierci',
      author: 'J.K. Rowling',
      description: 'Hocus pokus, czary mary ...',
      isbn: '978-83-8008-223-6',
      category: 'Fantasy',
      releaseDate: '2017-02-08',
      borrowDate: '',
      returnDate: '',
      addDate: '2019-08-11',
      cover: 'http://s.lubimyczytac.pl/upload/books/310000/310990/494239-352x500.jpg',
      publishingHouse: 'Media rodzina',
      availability: true,
      email: ''
    },
    {
      id: 7,
      title: 'Lot Nad Kukułczym Gniazdem',
      author: 'Ken Kesey',
      description: 'Ptaszki, gniazda, taka sytuacja...',
      isbn: '978-83-8125-414-4',
      category: 'Novel',
      releaseDate: '2014-02-08',
      borrowDate: '2019-06-17T14:28:40.673Z',
      returnDate: '',
      addDate: '2019-10-07',
      cover: 'http://s.lubimyczytac.pl/upload/books/4862000/4862746/690901-352x500.jpg',
      publishingHouse: 'Albatros',
      availability: true,
      email: ''
    },
    {
      id: 8,
      title: 'U nas za stodołą',
      author: 'Anna Sikorska i inni',
      description: 'Stodoła, uchylone okna itd.',
      isbn: '978-83-9523-282-4',
      category: 'Biography',
      releaseDate: '2014-02-08',
      borrowDate: '',
      returnDate: '',
      addDate: '2019-06-12',
      cover: 'http://s.lubimyczytac.pl/upload/books/4879000/4879071/720233-352x500.jpg',
      publishingHouse: 'Fundacja Ku Przyszłości',
      availability: true,
      email: ''
    },
    {
      id: 9,
      title: 'Kwiatki Jana Pawła II',
      author: 'Janusz Poniewierski',
      description: 'Książka o Papieżu, jakiej jeszcze nie było. Jej redaktorzy zebrali około setki "kwiatków"...',
      isbn: '978-83-240-0213-8',
      category: 'Biography',
      releaseDate: '2014-02-08',
      borrowDate: '',
      returnDate: '',
      addDate: '2019-04-12',
      cover: 'http://s.lubimyczytac.pl/upload/books/51000/51017/352x500.jpg',
      publishingHouse: 'Znak',
      availability: true,
      email: ''
    },
    {
      id: 10,
      title: 'Harry Potter i Więzień Azkabanu',
      author: 'J.K. Rowling',
      description: 'Hocus pokus, czary mary ...',
      isbn: '978-83-8008-215-1',
      category: 'Fantasy',
      releaseDate: '2016-02-08',
      borrowDate: '',
      returnDate: '',
      addDate: '2019-02-13',
      cover: 'http://s.lubimyczytac.pl/upload/books/308000/308637/532904-352x500.jpg',
      publishingHouse: 'Media rodzina',
      availability: true,
      email: ''
    },
    {
      id: 11,
      title: 'U nas za stodołą',
      author: 'Anna Sikorska i inni',
      description: 'Stodoła, uchylone okna itd.',
      isbn: '978-83-9523-282-4',
      category: 'Biography',
      releaseDate: '2014-02-08',
      borrowDate: '',
      returnDate: '',
      addDate: '2015-06-11',
      cover: 'http://s.lubimyczytac.pl/upload/books/4879000/4879071/720233-352x500.jpg',
      publishingHouse: 'Fundacja Ku Przyszłości',
      availability: true,
      email: ''
    },
    {
      id: 12,
      title: 'Harry Potter i Insygnia Śmierci',
      author: 'J.K. Rowling',
      description: 'Hocus pokus, czary mary ...',
      isbn: '978-83-8008-223-6',
      category: 'Fantasy',
      releaseDate: '2017-02-08',
      borrowDate: '',
      returnDate: '',
      addDate: '2019-07-01',
      cover: 'http://s.lubimyczytac.pl/upload/books/310000/310990/494239-352x500.jpg',
      publishingHouse: 'Media rodzina',
      availability: true,
      email: ''
    },
    {
      id: 13,
      title: 'Arek Blejwas i Angular z Azkabanu',
      author: 'Adrian Buller',
      description: 'Książka dokumentalna o historii pewnego starterkitowca',
      isbn: '978-83-7181-511-3',
      category: 'Drama',
      releaseDate: '1998-09-11',
      borrowDate: '2010-02-02',
      returnDate: '2019-06-08',
      addDate: '2005-04-04',
      cover: 'https://static01.helion.com.pl/global/okladki/326x466/c699b7f9758ad928df09bf00cfbf46eb,angupk.jpg',
      publishingHouse: 'PWN',
      availability: true,
      email: ''
    },
    {
      id: 14,
      title: 'Java dla zielonych',
      author: 'Adrian Buller',
      description: 'Podręcznik do programowania',
      isbn: '978-83-7181-510-2',
      category: 'Drama',
      releaseDate: '1999-09-11',
      borrowDate: '2000-02-02',
      returnDate: '2019-06-08',
      addDate: '2005-03-15',
      cover: 'https://static01.helion.com.pl/helion/okladki/326x466/javkp9.jpg',
      publishingHouse: 'PWN',
      availability: true,
      email: ''
    },
    {
      id: 15,
      title: 'Java dla zielonych',
      author: 'Adrian Buller',
      description: 'Podręcznik do programowania',
      isbn: '978-83-7181-510-2',
      category: 'Drama',
      releaseDate: '1999-09-11',
      borrowDate: '2000-02-02',
      returnDate: '2019-06-08',
      addDate: '2005-04-15',
      cover: 'https://static01.helion.com.pl/helion/okladki/326x466/javkp9.jpg',
      publishingHouse: 'PWN',
      availability: false,
      email: ''
    },
    {
      id: 16,
      title: 'Java dla zielonych',
      author: 'Adrian Buller',
      description: 'Podręcznik do programowania',
      isbn: '978-83-7181-510-2',
      category: 'Drama',
      releaseDate: '1999-09-11',
      borrowDate: '2000-02-02',
      returnDate: '2019-06-08',
      addDate: '2006-03-15',
      cover: 'https://static01.helion.com.pl/helion/okladki/326x466/javkp9.jpg',
      publishingHouse: 'PWN',
      availability: false,
      email: ''
    }
  ];

  const distinctBooks = [
    {
      id: 1,
      title: 'Java dla zielonych',
      author: 'Adrian Buller',
      description: 'Podręcznik do programowania',
      isbn: '978-83-7181-510-2',
      category: 'Drama',
      releaseDate: '1999-09-11',
      borrowDate: '2000-02-02',
      returnDate: '2019-06-08',
      addDate: '2005-03-14',
      cover: 'https://static01.helion.com.pl/helion/okladki/326x466/javkp9.jpg',
      publishingHouse: 'PWN',
      availability: false,
      email: ''
    },
    {
      id: 2,
      title: 'Arek Blejwas i Angular z Azkabanu',
      author: 'Adrian Buller',
      description: 'Książka dokumentalna o historii pewnego starterkitowca',
      isbn: '978-83-7181-511-3',
      category: 'Drama',
      releaseDate: '1998-09-11',
      borrowDate: '2010-02-02',
      returnDate: '2019-06-08',
      addDate: '2005-01-02',
      cover: 'https://static01.helion.com.pl/global/okladki/326x466/c699b7f9758ad928df09bf00cfbf46eb,angupk.jpg',
      publishingHouse: 'PWN',
      availability: true,
      email: ''
    },
    {
      id: 3,
      title: 'Pan Tadeusz',
      author: 'Adam Mickiewicz',
      description: 'Lektura szkolna',
      isbn: '988-99-7181-510-2',
      category: 'Horror',
      releaseDate: '1993-09-11',
      borrowDate: '2005-02-02',
      returnDate: '2019-06-08',
      addDate: '2005-01-03',
      cover: 'https://image.ceneostatic.pl/data/products/109070/i-pan-tadeusz.jpg',
      publishingHouse: 'PWN',
      availability: true,
      email: ''
    },
    {
      id: 4,
      title: 'Czerwona Jaskółka',
      author: 'Jason Matthews ',
      description: 'Ciekawa książka dla znudzonych ludzi',
      isbn: '978-83-8031-993-6',
      category: 'Novel',
      releaseDate: '2018-05-21',
      borrowDate: '',
      returnDate: '',
      addDate: '2019-02-13',
      cover: 'https://ecsmedia.pl/c/czerwona-jaskolka-tom-1-w-iext52324609.jpg',
      publishingHouse: 'Świat książki',
      availability: true,
      email: ''
    },
    {
      id: 5,
      title: 'Harry Potter i Więzień Azkabanu',
      author: 'J.K. Rowling',
      description: 'Hocus pokus, czary mary ...',
      isbn: '978-83-8008-215-1',
      category: 'Fantasy',
      releaseDate: '2016-02-08',
      borrowDate: '',
      returnDate: '',
      addDate: '2019-02-11',
      cover: 'http://s.lubimyczytac.pl/upload/books/308000/308637/532904-352x500.jpg',
      publishingHouse: 'Media rodzina',
      availability: true,
      email: ''
    },
    {
      id: 6,
      title: 'Harry Potter i Insygnia Śmierci',
      author: 'J.K. Rowling',
      description: 'Hocus pokus, czary mary ...',
      isbn: '978-83-8008-223-6',
      category: 'Fantasy',
      releaseDate: '2017-02-08',
      borrowDate: '',
      returnDate: '',
      addDate: '2019-08-11',
      cover: 'http://s.lubimyczytac.pl/upload/books/310000/310990/494239-352x500.jpg',
      publishingHouse: 'Media rodzina',
      availability: true,
      email: ''
    },
    {
      id: 7,
      title: 'Lot Nad Kukułczym Gniazdem',
      author: 'Ken Kesey',
      description: 'Ptaszki, gniazda, taka sytuacja...',
      isbn: '978-83-8125-414-4',
      category: 'Novel',
      releaseDate: '2014-02-08',
      borrowDate: '2019-06-17T14:28:40.673Z',
      returnDate: '',
      addDate: '2019-10-07',
      cover: 'http://s.lubimyczytac.pl/upload/books/4862000/4862746/690901-352x500.jpg',
      publishingHouse: 'Albatros',
      availability: true,
      email: ''
    },
    {
      id: 8,
      title: 'U nas za stodołą',
      author: 'Anna Sikorska i inni',
      description: 'Stodoła, uchylone okna itd.',
      isbn: '978-83-9523-282-4',
      category: 'Biography',
      releaseDate: '2014-02-08',
      borrowDate: '',
      returnDate: '',
      addDate: '2019-06-12',
      cover: 'http://s.lubimyczytac.pl/upload/books/4879000/4879071/720233-352x500.jpg',
      publishingHouse: 'Fundacja Ku Przyszłości',
      availability: true,
      email: ''
    },
    {
      id: 9,
      title: 'Kwiatki Jana Pawła II',
      author: 'Janusz Poniewierski',
      description: 'Książka o Papieżu, jakiej jeszcze nie było. Jej redaktorzy zebrali około setki "kwiatków"...',
      isbn: '978-83-240-0213-8',
      category: 'Biography',
      releaseDate: '2014-02-08',
      borrowDate: '',
      returnDate: '',
      addDate: '2019-04-12',
      cover: 'http://s.lubimyczytac.pl/upload/books/51000/51017/352x500.jpg',
      publishingHouse: 'Znak',
      availability: true,
      email: ''
    }
  ];

  const bookIsbn = {
      id: 15,
      title: 'Java dla zielonych',
      author: 'Adrian Buller',
      description: 'Podręcznik do programowania',
      isbn: '978-83-7181-510-2',
      category: 'Drama',
      releaseDate: '1999-09-11',
      borrowDate: '2000-02-02',
      returnDate: '2019-06-08',
      addDate: '2005-04-15',
      cover: 'https://static01.helion.com.pl/helion/okladki/326x466/javkp9.jpg',
      publishingHouse: 'PWN',
      availability: false,
      email: ''
    };

  const addBook = {
      id: 1,
      title: 'Java dla zielonych',
      author: 'Adrian Buller',
      description: 'Podręcznik do programowania',
      isbn: '978-83-7181-510-2',
      category: 'Drama',
      releaseDate: '1999-09-11',
      borrowDate: '2000-02-02',
      returnDate: '2019-06-08',
      addDate: '2005-03-14',
      cover: 'https://static01.helion.com.pl/helion/okladki/326x466/javkp9.jpg',
      publishingHouse: 'PWN',
      availability: false,
      email: ''
    };

  const returnBook = {
    id: 1,
    title: 'Java dla zielonych',
    author: 'Adrian Buller',
    description: 'Podręcznik do programowania',
    isbn: '978-83-7181-510-2',
    category: 'Drama',
    releaseDate: '1999-09-11',
    borrowDate: '2000-02-02',
    returnDate: '2019-06-08',
    addDate: '2005-03-14',
    cover: 'https://static01.helion.com.pl/helion/okladki/326x466/javkp9.jpg',
    publishingHouse: 'PWN',
    availability: false,
    email: ''
  };

  const borrowBook = {
    id: 1,
    title: 'Java dla zielonych',
    author: 'Adrian Buller',
    description: 'Podręcznik do programowania',
    isbn: '978-83-7181-510-2',
    category: 'Drama',
    releaseDate: '1999-09-11',
    borrowDate: '2000-02-02',
    returnDate: '2019-06-08',
    addDate: '2005-03-14',
    cover: 'https://static01.helion.com.pl/helion/okladki/326x466/javkp9.jpg',
    publishingHouse: 'PWN',
    availability: false,
    email: ''
  };

  afterEach(() => {
    httpClient.verify();
  });

  beforeEach(() => TestBed.configureTestingModule({
    schemas: [NO_ERRORS_SCHEMA],
    providers: [BookService],
    imports: [ReactiveFormsModule, RouterModule, HttpClientTestingModule, RouterTestingModule]
  }));

  beforeEach(() => {
    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
    service = TestBed.get(BookService);
    // @ts-ignore
    spyOn(service, 'getBooks').and.returnValue(of(allBooks));
    // @ts-ignore
    spyOn(service, 'getBookByIsbn').and.returnValue(of(bookIsbn));
    // @ts-ignore
    spyOn(service, 'addNewBook').and.returnValue(of(addBook));
    // @ts-ignore
    spyOn(service, 'borrowBook').and.returnValue(of(borrowBook));
    // @ts-ignore
    spyOn(service, 'returnBook').and.returnValue(of(returnBook));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all books from backend', async () => {
    //given
    const counterElements = 16;
    let books: Array<Book>;

    // when
    service.getBooks().subscribe(AllBooks => books = AllBooks);

    // then
    expect(books.length).toBe(counterElements);
  });

  it('should get book by isbn', async () => {
    // given
    const isbn = '978-83-7181-510-2';
    let book: Book;

    // when
    service.getBookByIsbn(isbn).subscribe(b => book = b);

    //then
    expect(book.isbn).toBe(isbn);
  });

  it('should add book', async () => {
    // given
    const expectedBook = addBook;
    let book: Book;

    // when
    // @ts-ignore
    service.addNewBook(addBook).subscribe(b => book = b);

    //then
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    expect(expectedBook).toBe(book);
  });

  it('should borrow book', async () => {
    // given
    const expectedBook = borrowBook;
    let book: Book;

    // when
    // @ts-ignore
    service.addNewBook(borrowBook).subscribe(b => book = b);

    //then
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    expect(expectedBook).toEqual(book);
  });

  it('should return book', async () => {
    // given
    const expectedBook = returnBook;
    let book: Book;

    // when
    // @ts-ignore
    service.addNewBook(returnBook).subscribe(b => book = b);

    //then
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    expect(expectedBook).toEqual(book);
  });

  it('should get distinct books', async () => {
    // given
    const expectedBooks = distinctBooks;
    let books: Array<Book>;

    // when
    service.getDistinctBooks().subscribe(b => books = b);

    //then
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    expect(expectedBooks).toEqual(books);
  });

  it('should get distinct books from specified books', () => {
    // given
    const expectedBooks = distinctBooks;
    let books: Array<Book>;

    // when
    // @ts-ignore
    books = service.getDistinctBooksFromSpecifiedBooks(allBooks);

    //then
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    expect(expectedBooks).toEqual(books);
  });

  it('should get available books by isbn', () => {
    // given
    const expectedBooks = someBooks;
    const isbn = someBooks[0].isbn;
    let books: Array<Book>;

    // when
    // @ts-ignore
    books = service.findAvailableBooksByIsbn(someBooks, isbn);

    //then
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    expect(expectedBooks).toEqual(books);
  });

  it('should get available books by isbn', () => {
    // given
    const expectedBooks = someBooks;
    const isbn = someBooks[0].isbn;
    // tslint:disable-next-line:prefer-const
    let books: Array<Book> = [];

    // when
    // @ts-ignore
    books = service.findUnavailableBooksByIsbn(someBooks, isbn);

    //then
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    expect(books).toEqual([]);
  });

  it('should find books by isbn', () => {
    // given
    const isbn = someBooks[0].isbn;
    // tslint:disable-next-line:prefer-const
    let books: Array<Book> = [];

    // when
    // @ts-ignore
    books = service.findUnavailableBooksByIsbn(someBooks, isbn);

    //then
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    expect(books).toEqual([]);
  });

  it('should find available books', () => {
    // given
    const expectedBooks = someBooks;
    // tslint:disable-next-line:prefer-const
    let books: Array<Book> = [];

    // when
    // @ts-ignore
    books = service.filterAvailable(someBooks);

    //then
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    expect(expectedBooks).toEqual(books);
  });

  it('should find available books', () => {
    // given
    // tslint:disable-next-line:prefer-const
    let books: Array<Book> = [];

    // when
    // @ts-ignore
    books = service.filterUnavailable(someBooks);

    //then
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    expect(books).toEqual([]);
  });

  it('should find books by isbn', async () => {
    // given
    // tslint:disable-next-line:prefer-const
    let books: Observable<Array<Book>>;
    const isbn = allBooks[3].isbn;
    let length: number;

    // when
    books = service.findBooksByISBN(isbn);
    // tslint:disable-next-line:no-shadowed-variable
    books.subscribe(books => length = books.length);

    //then
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    expect(length).toEqual(1);
  });
});
