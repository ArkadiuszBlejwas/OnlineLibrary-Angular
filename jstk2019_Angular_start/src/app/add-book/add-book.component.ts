import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../book';
import { Category } from '../category.enum';
import { BookService } from '../services/book.service';
import { OwnValidators } from '../validatorISBN';

@Component({
  selector: 'jstk-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  showAddBookForm = false;
  books: Array<Book>;
  existingBook: Book;
  readonly: boolean;
  isbn: string;

  validatorsIsbn = [
    Validators.required,
    Validators.minLength(17),
    Validators.maxLength(17),
    OwnValidators.validateBeginningIsbn(),
    OwnValidators.validateIsbnNumber()
  ];

  vr = Validators.required;

  checkIsbn = new FormGroup({ isbn: new FormControl('', this.validatorsIsbn) });

  addBook = new FormGroup({
    title: new FormControl('', this.vr),
    author: new FormControl('', this.vr),
    category: new FormControl('', this.vr),
    releaseDate: new FormControl('', this.vr),
    publishingHouse: new FormControl('', this.vr),
    description: new FormControl('', this.vr)
  });

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {}

  categories = () => {
    return Object.keys(Category);
  }

  onSubmitIsbn(value): void {
    this.isbn = value.isbn;
    this.bookService.findBooksByISBN(value.isbn).subscribe(books => {
      this.books = books;
      this.showAddBookForm = true;
    if (this.books.length !== 0) {
      this.existingBook = this.books[0];
      this.readonly = true;
    } else {
      this.readonly = false;
    }
    });
  }

  onSubmitAddBook(value): void {
    let book = new Book();
    if (this.existingBook) {
      this.existingBook.availability = true;
      book = this.existingBook;
    } else {
      book.author = value.author;
      book.title = value.title;
      book.category = value.category;
      book.description = value.description;
      book.releaseDate = value.releaseDate;
      book.publishingHouse = value.publishingHouse;
      book.isbn = this.isbn;
      book.availability = true;
    }
    this.bookService.addNewBook(book).subscribe(() => {this.router.navigate(['']); });
  }
}
