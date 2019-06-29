import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BorrowBookComponent } from './borrow-book/borrow-book.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ReturnBookComponent } from './return-book/return-book.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'book/:isbn', component: BookDetailsComponent},
  { path: 'add', component: AddBookComponent},
  { path: 'borrow/:isbn', component: BorrowBookComponent},
  { path: 'return/:isbn', component: ReturnBookComponent},
  { path: 'books/:category', component: HomePageComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
