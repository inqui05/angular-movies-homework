import {
  ChangeDetectionStrategy,
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';

const MAX_PAGE_COUNT_FROM_API = 500;

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PaginationComponent implements OnInit {
  @Output() goToPage = new EventEmitter<string>();

  public currentPage = 1;

  public lastPage = 1;

  public pages: number[] = [];

  public MAX_BUTTONS_COUNT = 5;

  @Input() set setPagination(pages: number) {
    if (pages) {
      this.lastPage = pages <= MAX_PAGE_COUNT_FROM_API ? pages : MAX_PAGE_COUNT_FROM_API;
      this.currentPage = 1;
      this.addStartPagesToPagination();
    } else {
      this.lastPage = 0;
    }
  }

  ngOnInit() {
    this.addStartPagesToPagination();
  }

  public setPage(pageNumber: number): void {
    if (pageNumber === this.currentPage) {
      return;
    }

    this.currentPage = pageNumber;
    this.fillCurrentPagesToPagination(pageNumber);
    this.goToPage.emit(pageNumber.toString());
  }

  public addStartPagesToPagination(): void {
    const pages: number[] = [];

    if (this.lastPage > this.MAX_BUTTONS_COUNT) {
      for (let i = 1; i <= this.MAX_BUTTONS_COUNT; i += 1) {
        pages.push(i);
      }
    } else if (this.pages.length === 0 && this.lastPage < this.MAX_BUTTONS_COUNT) {
      for (let i = 1; i <= this.lastPage; i += 1) {
        pages.push(i);
      }
    } else if (this.lastPage < this.MAX_BUTTONS_COUNT) {
      for (let i = 1; i <= this.lastPage; i += 1) {
        pages.push(i);
      }
    }

    this.pages = pages;
  }

  public fillCurrentPagesToPagination(pageNumber: number):void {
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
