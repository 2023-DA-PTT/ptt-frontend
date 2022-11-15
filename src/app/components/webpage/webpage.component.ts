import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-webpage',
  templateUrl: './webpage.component.html',
  styleUrls: ['./webpage.component.scss'],
  host: {
    class:'w-full'
  }
})
export class WebpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
