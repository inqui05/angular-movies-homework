import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';

import { IPagination } from '../../models/pagination.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export default class PaginationComponent implements OnInit {
  public currentPage = 1;

  public lastPage = 0;

  public pages: number[] = [];

  public MAX_BUTTONS_COUNT = 5;

  @Input() set setPagination(pagination: IPagination) {
    if (pagination) {
      this.lastPage = Math.ceil(pagination.itemsCount / pagination.pageSize);
      this.currentPage = 1;
      this.addStartPagesToPagination();
    }
  }

  @Output() goToPage = new EventEmitter<number>();

  ngOnInit() {
    this.addStartPagesToPagination();
  }

  public setPage(pageNumber: number): void {
    if (pageNumber === this.currentPage) {
      return;
    }

    this.currentPage = pageNumber;
    this.fillCurrentPagesToPagination(pageNumber);
    this.goToPage.emit(pageNumber);
  }

  private addStartPagesToPagination(): void {
    if (this.lastPage > this.MAX_BUTTONS_COUNT) {
      const pages: number[] = [];

      for (let i = 1; i <= this.MAX_BUTTONS_COUNT; i += 1) {
        pages.push(i);
      }

      this.pages = pages;
    } else if (this.pages.length === 0 && this.lastPage < this.MAX_BUTTONS_COUNT) {
      for (let i = 1; i <= this.lastPage; i += 1) {
        this.pages.push(i);
      }
    }
  }

  private fillCurrentPagesToPagination(pageNumber: number):void {
    if (this.lastPage > this.MAX_BUTTONS_COUNT) {
      const newPages: number[] = [];
      if (pageNumber < 4) {
        this.addStartPagesToPagination();
      } else if (pageNumber >= 4 && pageNumber <= this.lastPage - 3) {
        for (let i = 0; i < this.MAX_BUTTONS_COUNT; i += 1) {
          newPages.push(pageNumber - 2 + i);
        }

        this.pages = newPages;
      } else if (pageNumber > this.lastPage - 3) {
        for (let i = this.lastPage - 5; i < this.lastPage; i += 1) {
          newPages.push(i + 1);
        }

        this.pages = newPages;
      }
    }
  }
}
