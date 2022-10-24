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

    if (!fromDate || this.checkOffsets(fromDate, this.toDate)) {
      this.toastr.error("Invalid start date!");
      return;
    }

    this.fromDate = Math.floor(fromDate);
    this.fromDateChange.emit(this.fromDate);
  }

  setToDate(toD: string) {
    const toDate = new Date(toD).getTime();

    if (!toDate || this.checkOffsets(toDate, this.toDate)) {
      this.toastr.error("Invalid end date!");
      return;
    }

    this.toDate = Math.floor(toDate);
    this.toDateChange.emit(this.toDate);
  }

  onSubmit(filterForm: NgForm) {
    if (!filterForm.valid) {
      return;
    }

    this.submitValid.emit();
  }

  setInterval($event: any) {
    if ($event < 100) {
      this.toastr.error("Interval has to be greater than 100");
      return;
    }

    this.interval = $event;
    this.intervalChange.emit(this.interval);
  }

  setFromOffset($event: any) {
    if (this.checkOffsets($event, this.toDate)) {
      this.toastr.error("Invalid offset!");
      return;
    }

    this.fromDate = $event;
    this.fromDateChange.emit(this.fromDate);
  }

  setToOffset($event: any) {
    if (this.checkOffsets(this.fromDate, $event)) {
      this.toastr.error("Invalid offset!");
      return;
    }

    this.toDate = $event;
    this.toDateChange.emit(this.toDate);
  }

  checkOffsets(fromDate: number, toDate: number): boolean {
    return fromDate < toDate && fromDate > 0 && toDate > 0;
  }
}
