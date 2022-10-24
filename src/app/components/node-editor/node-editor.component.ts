import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-node-editor',
  templateUrl: './node-editor.component.html',
  styleUrls: ['./node-editor.component.scss']
})
export class NodeEditorComponent implements OnInit {


  x: number = 10;
  y: number = 10;
  startX: number = 0;
  startY: number = 0;
  dragging: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onDragStart(event: DragEvent) {
    //this.dragging = true;
    //this.startX = event.clientX;
    //this.startY = event.clientY;
  }

  public onDrag(event: DragEvent) {
    if(!this.dragging) {
      return;
    }

    //this.x += event.clientX - this.startX;
    //this.y += event.clientY - this.startY;
    //console.log(event);
  }

  public onDragEnd(event: DragEvent) {
    //this.dragging = false;
    //this.x += event.clientX-this.startX;
    //this.y += event.clientY-this.startY;
  }
}
