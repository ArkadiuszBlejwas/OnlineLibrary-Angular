import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../book';
import { SearchDetailsContainer } from '../home-page/search-details-container';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url = 'http://localhost:3000/books';
  books = Array<Book>();

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(this.url);
  }

  getBookByIsbn(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.url}?isbn=${isbn}`);
  }

  quickSearch(term: string): Observable<Array<Book>> {
    return this.getDistinctBooks().pipe(
      map(books =>
        books.filter(b => b.title.toLowerCase().includes(term.toLowerCase()) || b.author.toLowerCase().includes(term.toLowerCase()))
      )
    );
  }

  filterAvailable(books: Array<Book>): Array<Book> {
    return books.filter(book => book.availability);
  }

  filterUnavailable(books: Array<Book>): Array<Book> {
    return books.filter(book => !book.availability);
  }

  searchBooksByDetails(searchedBook: SearchDetailsContainer): Observable<Array<Book>> {
    return this.getBooks().pipe(
      map(books => {
        return books
          .filter(book => this.filterTitle(book.title, searchedBook.title))
          .filter(book => this.filterAuthors(book.author, searchedBook.author))
          .filter(book => this.filterDateFrom(new Date(book.releaseDate), searchedBook.dateFrom))
          .filter(book => this.filterDateTo(new Date(book.releaseDate), searchedBook.dateTo))
          .filter(book => this.filterPublishingHause(book.publishingHouse, searchedBook.publishingHouse))
          .filter(book => this.filterCategory(book.category, searchedBook.category))
          .filter(book => this.filterAvailability(book.availability, searchedBook.availability));
      })
    );
  }

  // tslint:disable-next-line:prefer-function-over-method
  private filterTitle(title: string, titleForm: string): boolean {
    if (!titleForm) {
      return true;
    }

    return title.toLowerCase().includes(titleForm.toLowerCase());
  }
  // tslint:disable-next-line:prefer-function-over-method
  private filterAuthors(authors: string, authorsForm: string): boolean {
    if (!authorsForm) {
      return true;
    }

    return authors.toLowerCase().includes(authorsForm.toLowerCase());
  }

  // tslint:disable-next-line:prefer-function-over-method
  private filterDateFrom(releaseDate: Date, dateFrom: Date): boolean {
    if (!dateFrom) {
      return true;
    }

    return releaseDate >= dateFrom;
  }

  // tslint:disable-next-line:prefer-function-over-method
  private filterDateTo(releaseDate: Date, dateTo: Date): boolean {
    if (!dateTo) {
      return true;
    }

    return releaseDate <= dateTo;
  }

  // tslint:disable-next-line:prefer-function-over-method
  private filterPublishingHause(publishingHouse, publishingHouseForm): boolean {
    if (!publishingHouseForm) {
      return true;
    }

    return publishingHouse.toLowerCase().includes(publishingHouseForm.toLowerCase());
  }

  // tslint:disable-next-line:prefer-function-over-method
  private filterCategory(category, categoryForm): boolean {
    if (!categoryForm) {
      return true;
    }

    return category.toLowerCase() === categoryForm.toLowerCase();
  }

  // tslint:disable-next-line:prefer-function-over-method
  private filterAvailability(availability, availabilityForm): boolean {
    if (availabilityForm === undefined) {
      return true;
    }

    return availability === availabilityForm; //JSON.parse(
  }

  getBooksByCategory(values: any): Observable<Array<Book>> {
    return this.getDistinctBooks().pipe(map(books => books.filter(b => (values.category !== null ? b.category === values.category : true))));
  }

  findRecentlyBorrowedBooks(): Observable<Array<Book>> {
    return this.getBooks().pipe(
      map(books =>
        books
          .filter(book => book.borrowDate)
          .sort((book1, book2) => this.sortByBorrowDates(book1, book2))
          .slice(0, 3)
      )
    );
  }

  // tslint:disable-next-line:prefer-function-over-method
  private sortByBorrowDates(book1: Book, book2: Book): number {
    // tslint:disable-next-line:one-variable-per-declaration
    const borrowDate1 = new Date(book1.borrowDate),
      borrowDate2 = new Date(book2.borrowDate);

    return (borrowDate2 as any) - (borrowDate1 as any);
  }

  findAvailableBooksByIsbn(books: Array<Book>, isbn: string): Array<Book> {
    return books.filter(book => book.isbn === isbn && book.availability);
  }

  findUnavailableBooksByIsbn(books: Array<Book>, isbn: string): Array<Book> {
    return books.filter(book => book.isbn === isbn && !book.availability);
  }

  findBooksByISBN(isbn: string): Observable<Array<Book>> {
    return this.getBooks().pipe(map(books => books.filter(book => book.isbn === isbn)));
  }

  sortBooks(filteredBooks: Observable<Array<Book>>, option: number): Observable<Array<Book>> {
    switch (option) {
      case 1: {
        return this.getSortedBooksByAddDateDesc(filteredBooks);
        break;
      }
      case 2: {
        return this.getSortedBooksByAddDateAsc(filteredBooks);
        break;
      }
      case 3: {
        return this.getSortedBooksByReleaseDateDesc(filteredBooks);
        break;
      }
      case 4: {
        return this.getSortedBooksByReleaseDateAsc(filteredBooks);
        break;
      }
      case 5: {
        return this.getSortedBooksByTitleDesc(filteredBooks);
        break;
      }
      case 6: {
        return this.getSortedBooksByTitleAsc(filteredBooks);
      }
      case 7: {
        return this.getSortedBooksBySurnameDesc(filteredBooks);
        break;
      }
      case 8: {
        return this.getSortedBooksBySurnameAsc(filteredBooks);
        break;
      }
      default: {
        return this.getSortedBooksByAddDateDesc(filteredBooks);
      }
    }
  }

  getSortedBooksByAddDateDesc(currentlyFilteredBooks: Observable<Array<Book>>): Observable<Array<Book>> {
    return currentlyFilteredBooks.pipe(map(items => items.sort((a, b) => (a.addDate > b.addDate ? -1 : 1))));
  }

  // tslint:disable-next-line:prefer-function-over-method
  private getSortedBooksByAddDateAsc(currentlyFilteredBooks: Observable<Array<Book>>): Observable<Array<Book>> {
    return currentlyFilteredBooks.pipe(map(items => items.sort((a, b) => (a.addDate > b.addDate ? 1 : -1))));
  }

  // tslint:disable-next-line:prefer-function-over-method
  private getSortedBooksByReleaseDateDesc(currentlyFilteredBooks: Observable<Array<Book>>): Observable<Array<Book>> {
    return currentlyFilteredBooks.pipe(map(items => items.sort((a, b) => (a.releaseDate > b.releaseDate ? -1 : 1))));
  }

  // tslint:disable-next-line:prefer-function-over-method
  private getSortedBooksByReleaseDateAsc(currentlyFilteredBooks: Observable<Array<Book>>): Observable<Array<Book>> {
    return currentlyFilteredBooks.pipe(map(items => items.sort((a, b) => (a.releaseDate > b.releaseDate ? 1 : -1))));
  }

  // tslint:disable-next-line:prefer-function-over-method
  private getSortedBooksByTitleDesc(currentlyFilteredBooks: Observable<Array<Book>>): Observable<Array<Book>> {
    return currentlyFilteredBooks.pipe(map(items => items.sort((a, b) => (a.title > b.title ? -1 : 1))));
  }

  // tslint:disable-next-line:prefer-function-over-method
  private getSortedBooksByTitleAsc(currentlyFilteredBooks: Observable<Array<Book>>): Observable<Array<Book>> {
    return currentlyFilteredBooks.pipe(map(items => items.sort((a, b) => (a.title > b.title ? 1 : -1))));
  }

  // tslint:disable-next-line:prefer-function-over-method
  private getSortedBooksBySurnameDesc(currentlyFilteredBooks: Observable<Array<Book>>): Observable<Array<Book>> {
    return currentlyFilteredBooks.pipe(
      map(items => items.sort((a, b) => (a.author.substr(a.author.indexOf(' ')) > b.author.substr(b.author.indexOf(' ')) ? 1 : -1)))
    );
  }

  // tslint:disable-next-line:prefer-function-over-method
  private getSortedBooksBySurnameAsc(currentlyFilteredBooks: Observable<Array<Book>>): Observable<Array<Book>> {
    return currentlyFilteredBooks.pipe(
      map(items => items.sort((a, b) => (a.author.substr(a.author.indexOf(' ')) > b.author.substr(b.author.indexOf(' ')) ? -1 : 1)))
    );
  }

  getDistinctBooksFromSpecifiedBooks(books: Array<Book>): Array<Book> {
    return books.filter(book => books.find(b => b.isbn === book.isbn).id === book.id);
  }

  getDistinctBooks(): Observable<Array<Book>> {
    return this.getBooks().pipe(map(books => books.filter(book => books.find(b => b.isbn === book.isbn).id === book.id)));
  }

  addNewBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.url, book);
  }

  borrowBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.url}/${book.id}`, book);
  }

  returnBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.url}/${book.id}`, book);
  }
}
