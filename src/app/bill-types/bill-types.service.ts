import { Injectable } from '@angular/core';
import { BillType } from './bill-type';

declare let electron: any;

@Injectable()
export class BillTypesService {
  ipc: any;

  constructor() {
    this.ipc = electron.ipcRenderer;
  }

  getBillTypes(compRef: any): void {
    this.ipc.send('loadBillTypes');
    this.ipc.on('billTypesLoaded', (event, result) => {
      compRef.billTypes = result;
      const pageElement: any = document.getElementById('billTypePage');
      if (pageElement !== null) {
        pageElement.click();
      }
    });
  }

  getBillType(compRef: any, billTypeId: number): void {
    this.ipc.send('getBillType', billTypeId);
    this.ipc.on('billTypeRetrieved', (event, result) => {
      compRef.billType = result;
    });
  }

  save(billType: BillType): void {
    this.ipc.send('insertBillType', billType);
  }

  update(billType: BillType): void {
    this.ipc.send('updateBillType', billType);
  }

  delete(billType: BillType): void {
    this.ipc.send('deleteBillType', billType);
  }
}
