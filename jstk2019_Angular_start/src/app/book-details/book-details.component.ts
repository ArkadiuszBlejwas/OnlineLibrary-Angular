import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../services/book.service';
import { Observable } from "rxjs";

import { map } from 'rxjs/operators';

@Component({
  selector: 'jstk-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  constructor(private bookService: BookService,
    readonly activatedRoute: ActivatedRoute,
    private location: Location) { }

  // tslint:disable-next-line:typedef
  books: Observable<Array<Book>>;
  book: Observable<Book>;
  borrowedBooks: Observable<Array<Book>>;
  availableBooks: Observable<Array<Book>>;


  ngOnInit(): void {
    this.showDetails();
  }

  showDetails(): void {
    this.activatedRoute.params.subscribe(params => {
      this.books = this.bookService.findBooksByISBN(params.isbn);
      this.book = this.books.pipe(map(books => books[0]));
      this.borrowedBooks = this.books.pipe(map(books => books.filter(b => !b.availability)));
      this.availableBooks = this.books.pipe(map(books => books.filter(b => b.availability)));
    });
  }

  goBack = () => {
      this.location.back();
  }
}
