import { Component, OnInit } from '@angular/core';
import { Category } from '../category.enum';

@Component({
  selector: 'jstk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  categories() {
    return Object.keys(Category);
  };
  // tslint:disable-next-line:unnecessary-constructor
  constructor() { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }
}
