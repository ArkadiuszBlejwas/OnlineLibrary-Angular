import { AfterViewInit, Component, OnInit } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Book } from '../book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'jstk-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.scss']
})
export class QuickSearchComponent implements OnInit, AfterViewInit {

  books$: Observable<Array<Book>>;
  private searchTerms = new Subject<string>();

  constructor(private bookService: BookService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const filtr = document.getElementById('search-box');
    fromEvent(filtr, 'keyup')
    .pipe(
        map(event => (event.target as any).value),
        // startWith(''),
        debounceTime(400),
        distinctUntilChanged()
      // tslint:disable-next-line:no-shadowed-variable
    ).subscribe(filtr => this.books$ =
    this.bookService.quickSearch(filtr));
  }
}
