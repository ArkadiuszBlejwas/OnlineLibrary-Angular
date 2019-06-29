import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'jstk-recently-borrowed-books',
  templateUrl: './recently-borrowed-books.component.html',
  styleUrls: ['./recently-borrowed-books.component.scss']
})
export class RecentlyBorrowedBooksComponent implements OnInit {

  books$: Observable<Array<Book>>;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.books$ = this.bookService.findRecentlyBorrowedBooks();
  }

}
