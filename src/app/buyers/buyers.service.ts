import { Injectable } from '@angular/core';
import { Buyer } from './buyer';

declare let electron: any;

@Injectable()
export class BuyersService {
  ipc: any;

  constructor() {
    this.ipc = electron.ipcRenderer;
  }

  getBuyers(compRef: any): void {
    this.ipc.send('loadBuyers');
    this.ipc.on('buyersLoaded', (event, result) => {
      compRef.buyers = result;
      const pageElement: any = document.getElementById('buyerPage');
      if (pageElement !== null) {
        pageElement.click();
      }
    });
  }

  getBuyer(compRef: any, buyerId: number): void {
    this.ipc.send('getBuyer', buyerId);
    this.ipc.on('buyerRetrieved', (event, result) => {
      compRef.buyer = result;
    });
  }

  save(buyer: Buyer): void {
    this.ipc.send('insertBuyer', buyer);
  }

  update(buyer: Buyer): void {
    this.ipc.send('updateBuyer', buyer);
  }

  delete(buyer: Buyer): void {
    this.ipc.send('deleteBuyer', buyer);
  }
}
