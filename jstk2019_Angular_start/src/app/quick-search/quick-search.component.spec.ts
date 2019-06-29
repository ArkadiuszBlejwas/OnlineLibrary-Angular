import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { QuickSearchComponent } from './quick-search.component';

describe('QuickSearchComponent', () => {
  let component: QuickSearchComponent;
  let fixture: ComponentFixture<QuickSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickSearchComponent ],
      imports: [ ReactiveFormsModule, RouterModule, HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
