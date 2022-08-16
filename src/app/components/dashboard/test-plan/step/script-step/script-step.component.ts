import { Component, OnInit } from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";

@Component({
  selector: 'app-script-step',
  templateUrl: './script-step.component.html',
  styleUrls: ['./script-step.component.scss']
})
export class ScriptStepComponent implements OnInit {
  editorModel: CodeModel = {
    language: 'javascript',
    value: 'return { x: params.get("username") };',
    uri: 'script.json'

  };
  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };

  constructor() { }

  ngOnInit(): void {
  }

}
