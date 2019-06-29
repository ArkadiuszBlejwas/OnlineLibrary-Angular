import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'jstk-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.scss']
})
export class BorrowBookComponent implements OnInit {

  borrowBook = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    returnDate: new FormControl(this.getDefaultReturnDate(), [Validators.required])
  });

  private book: Book;
  isbn: string;
  availableBooks: Array<Book>;

  getActualDate(): string {
    return new Date().toJSON().slice(0, 10);
  }

  getDefaultReturnDate(): string {
    return new Date(new Date().getTime() + (30 * 24 * 3600 * 1000)).toJSON().slice(0, 10);
  }

  getBook(): void {
    this.activatedRoute.params.subscribe(params => {
      this.bookService.getBookByIsbn(params.isbn).subscribe(book => this.book = book[0]);
    });
  }

  onSubmit(value): void {
    if (this.availableBooks !== undefined && this.availableBooks.length !== 0) {
      const book = this.availableBooks[0];
      book.availability = false;
      book.borrowDate = new Date();
      book.email = value.email;
      book.returnDate = value.returnDate;
      // tslint:disable-next-line:prefer-template
      this.bookService.borrowBook(book).subscribe(() => this.router.navigate(['/book/' + this.isbn]));
    }
  }

  constructor(private bookService: BookService,
              private router: Router,
              readonly activatedRoute: ActivatedRoute,
              private location: Location) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getBook();
    this.activatedRoute.params.subscribe(params => {
      this.isbn = params.isbn;
      this.bookService.getBooks().
      subscribe(books => {
        this.availableBooks = this.bookService.findAvailableBooksByIsbn(books, this.isbn);
      });
    });
  }
}
