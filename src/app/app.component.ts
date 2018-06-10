import { Component, OnInit } from '@angular/core';

declare let electron: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ipc: any;

  constructor() {
    this.ipc = electron.ipcRenderer;
  }

  ngOnInit() {
    this.ipc.send('mainWindowLoaded');
  }
}
