import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Book } from '../book';
import { Category } from '../category.enum';
import { BookService } from '../services/book.service';
import { SearchDetailsContainer } from './search-details-container';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'jstk-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  distinctBooks: Array<Book>;
  AvailableBooks: Array<Book>;
  UnavailableBooks: Array<Book>;
  categoryFromParam: Category;

  searchDetailsContainer: SearchDetailsContainer = new SearchDetailsContainer(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined);

  constructor(private bookService: BookService, readonly activatedRoute: ActivatedRoute, readonly router: Router) {
  }

  searchBook = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    category: new FormControl(''),
    dateFrom: new FormControl(''),
    dateTo: new FormControl(''),
    publishingHouse: new FormControl(''),
    availability: new FormControl(''),
    sort: new FormControl('')
  });

  private onChanges(): void {
    this.searchBook.valueChanges.pipe(debounceTime(300)).subscribe(
      val => {
        this.searchBooks(new SearchDetailsContainer(
          val.title || undefined,
          val.author || undefined,
          val.category || this.categoryFromParam || undefined,
          val.dateFrom || undefined,
          val.dateTo || undefined,
          val.publishingHouse || undefined,
          val.availability === '' ? undefined : val.availability));
      });
  }

  ngOnInit(): void {
    this.onChanges();
    this.searchBooks(this.searchDetailsContainer);
  }

  getBooksByCategory(): void {
    this.activatedRoute.params.subscribe(params => {
      // @ts-ignore
      this.categoryFromParam = Category[params.category];
    });
  }

  // tslint:disable-next-line:typedef
  searchBooks(data: SearchDetailsContainer) {
    if (this.router.url !== '/') {
      this.getBooksByCategory();
    }
    if (this.categoryFromParam) {
      data.category = this.categoryFromParam;
    }
    this.bookService.sortBooks(this.bookService.searchBooksByDetails(data), this.searchBook.value.sort)
      .subscribe(books => {
          this.distinctBooks = this.bookService.getDistinctBooksFromSpecifiedBooks(books);
          this.AvailableBooks = this.bookService.filterAvailable(books);
          this.UnavailableBooks = this.bookService.filterUnavailable(books);
        }
      );
  }

  checkIsAvailable(isbn: string): boolean {
    return this.AvailableBooks.findIndex(book => book.isbn === isbn) > -1;
  }

  checkIsUnavailable(isbn: string): boolean {
    return this.UnavailableBooks.findIndex(book => book.isbn === isbn) > -1;
  }

  categories = () => {
    return Object.keys(Category);
  }
}
