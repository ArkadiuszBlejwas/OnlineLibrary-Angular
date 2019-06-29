import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddBookComponent } from './add-book/add-book.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BorrowBookComponent } from './borrow-book/borrow-book.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import { RecentlyBorrowedBooksComponent } from './recently-borrowed-books/recently-borrowed-books.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { BookService } from './services/book.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    BookDetailsComponent,
    QuickSearchComponent,
    RecentlyBorrowedBooksComponent,
    AddBookComponent,
    ReturnBookComponent,
    BorrowBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    BookService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
