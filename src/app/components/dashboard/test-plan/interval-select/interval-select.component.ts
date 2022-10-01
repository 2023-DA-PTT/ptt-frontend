import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {IntervalSelectMode} from "../../../../models/interval-select-mode";

@Component({
  selector: 'app-interval-select',
  templateUrl: './interval-select.component.html',
  styleUrls: ['./interval-select.component.scss']
})
export class IntervalSelectComponent implements OnInit {
  @Output() fromDateChange = new EventEmitter<number>();
  @Input() fromDate: number = 0;
  @Output() toDateChange = new EventEmitter<number>();
  @Input() toDate: number = 0;
  @Output() submitValid = new EventEmitter<void>();
  @Output() intervalChange = new EventEmitter<number>();
  @Input() interval: number = 0;
  @Input() mode: IntervalSelectMode = IntervalSelectMode.DATE_TIME;

  constructor() { }

  ngOnInit(): void {
  }

  setFromDate(fromD: string) {
    const fromDate = new Date(fromD).getTime();

    if (fromDate) {
      this.fromDate = Math.floor(fromDate);
      this.fromDateChange.emit(this.toDate);
    }
  }

  setToDate(toD: string) {
    const toDate = new Date(toD).getTime();

    if (toDate) {
      this.toDate = Math.floor(toDate);
      this.toDateChange.emit(this.toDate);
    }
  }

  onSubmit(filterForm: NgForm) {
    if (!filterForm.valid) {
      return;
    }

    this.submitValid.emit();
  }

  setInterval($event: any) {
    if($event >= 100) {
      this.interval = $event;
      this.intervalChange.emit(this.interval);
    }
  }

  setFromOffset($event: any) {
    this.fromDate = $event;
    this.fromDateChange.emit(this.fromDate);
  }

  setToOffset($event: any) {
    this.toDate = $event;
    this.toDateChange.emit(this.toDate);
  }
}
