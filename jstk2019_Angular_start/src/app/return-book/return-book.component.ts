import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'jstk-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.scss']
})
export class ReturnBookComponent implements OnInit {

  private book: Book;
  isbn: string;
  unavailableBooks: Array<Book>;

  returnBook = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])
  });

  getBook(): void {
    this.activatedRoute.params.subscribe(params => {
      this.bookService.getBookByIsbn(params.isbn).subscribe(book => this.book = book[0]);
    });
  }

  onSubmit(value): void {
    if (this.unavailableBooks !== undefined && this.unavailableBooks.length !== 0) {
      const book = this.unavailableBooks.filter(aBook => aBook.email = value)[0];
      book.availability = true;
      book.email = '';
      book.returnDate = '';
      // tslint:disable-next-line:prefer-template
      this.bookService.returnBook(book).subscribe(() => this.router.navigate(['/book/' + this.isbn]));
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
        this.unavailableBooks = this.bookService.findUnavailableBooksByIsbn(books, this.isbn);
      });
    });
  }
}
