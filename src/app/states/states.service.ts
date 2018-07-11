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
      const pageElement: any = document.getElementById('statePage');
      if (pageElement !== null) {
        pageElement.click();
      }
    });
  }

  getState(compRef: any, stateId: number): void {
    this.ipc.send('getState', stateId);
    this.ipc.on('stateRetrieved', (event, result) => {
      compRef.state = result;
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
