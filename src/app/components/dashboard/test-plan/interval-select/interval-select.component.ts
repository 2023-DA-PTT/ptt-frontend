import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {IntervalSelectMode} from "../../../../models/interval-select-mode";
import {ToastrService} from "ngx-toastr";
import {from} from "rxjs";

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

  constructor(private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  setFromDate(fromD: string) {
    const fromDate = new Date(fromD).getTime();

    this.fromDate = Math.floor(fromDate);
    this.fromDateChange.emit(this.fromDate);
  }

  setToDate(toD: string) {
    const toDate = new Date(toD).getTime();

    this.toDate = Math.floor(toDate);
    this.toDateChange.emit(this.toDate);
  }

  onSubmit(filterForm: NgForm) {
    if (!filterForm.valid) {
      return;
    }

    if (this.interval < 100) {
      this.toastr.error("Interval has to be greater than 100");
      return;
    }


    if (this.fromDate == null || !this.toDate || !this.checkOffsets(this.fromDate, this.toDate)) {
      this.toastr.error("Invalid start or end date!");
      return;
    }

    this.submitValid.emit();
  }

  setInterval($event: any) {
    this.interval = $event;
    this.intervalChange.emit(this.interval);
  }

  setFromOffset($event: any) {
    this.fromDate = $event;
    this.fromDateChange.emit(this.fromDate);
  }

  setToOffset($event: any) {
    this.toDate = $event;
    this.toDateChange.emit(this.toDate);
  }

  checkOffsets(fromDate: number, toDate: number): boolean {
    return fromDate < toDate && fromDate >= 0 && toDate > 0;
  }
}
