import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AddBookComponent } from './add-book.component';

describe('AddBookComponent', () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookComponent ],
      imports: [ ReactiveFormsModule, RouterModule, HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validator valide correct', async(() => {
    // given
    component.checkIsbn.get('isbn').setValue('978-83-9523-282-4');

    // when
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // then
      expect(component.checkIsbn.get('isbn').valid).toBeTruthy();
    });
  }));

  it('should validator valide incorrect', async(() => {
    // given
    component.checkIsbn.get('isbn').setValue('977-83-9523-282-4');

    // when
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // then
      expect(component.checkIsbn.get('isbn').invalid).toBeTruthy();
    });
  }));

});
