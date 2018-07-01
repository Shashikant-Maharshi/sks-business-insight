import { Injectable } from '@angular/core';
import { State } from './state';

declare let electron: any;

@Injectable()
export class StatesService {
  ipc: any;

  constructor() {
    this.ipc = electron.ipcRenderer;
  }

  getStates(compRef: any): void {
    this.ipc.send('loadStates');
    this.ipc.on('statesLoaded', (event, result) => {
      compRef.states = result;
      document.getElementById('statePage').click();
    });
  }

  save(state: State): void {
    this.ipc.send('insertState', state);
  }

  update(state: State): void {
    this.ipc.send('updateState', state);
  }

  delete(state: State): void {
    this.ipc.send('deleteState', state);
  }
}
