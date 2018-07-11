import { Injectable } from '@angular/core';
import { PurchaseEntry } from './purchase-entry';

declare let electron: any;

@Injectable()
export class PurchaseEntriesService {
  ipc: any;

  constructor() {
    this.ipc = electron.ipcRenderer;
  }

  getPurchaseEntries(compRef: any, invoiceId: number): void {
    this.ipc.send('loadPurchaseEntries', invoiceId);
    this.ipc.on('purchaseEntriesLoaded', (event, result) => {
      compRef.purchaseEntries = result;
      const pageElement: any = document.getElementById('purchaseEntryPage');
      if (pageElement !== null) {
        pageElement.click();
      }
    });
  }

  save(purchaseEntry: PurchaseEntry): void {
    this.ipc.send('insertPurchaseEntry', purchaseEntry);
  }

  update(purchaseEntry: PurchaseEntry): void {
    this.ipc.send('updatePurchaseEntry', purchaseEntry);
  }

  delete(purchaseEntry: PurchaseEntry): void {
    this.ipc.send('deletePurchaseEntry', purchaseEntry);
  }
}
