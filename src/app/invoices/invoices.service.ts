import { Injectable } from '@angular/core';
import { Invoice } from './invoice';

declare let electron: any;

@Injectable()
export class InvoicesService {
  ipc: any;

  constructor() {
    this.ipc = electron.ipcRenderer;
  }

  getInvoices(compRef: any): void {
    this.ipc.send('loadInvoices');
    this.ipc.on('invoicesLoaded', (event, result) => {
      compRef.invoices = result;
      const pageElement: any = document.getElementById('invoicePage');
      if (pageElement !== null) {
        pageElement.click();
      }
    });
  }

  getInvoice(compRef: any, invoiceId: number): void {
    this.ipc.send('getInvoice', invoiceId);
    this.ipc.on('invoiceRetrieved', (event, result) => {
      compRef.invoice = result;
    });
  }

  save(invoice: Invoice): void {
    this.ipc.send('insertInvoice', invoice);
  }

  update(invoice: Invoice): void {
    this.ipc.send('updateInvoice', invoice);
  }

  delete(invoice: Invoice): void {
    this.ipc.send('deleteInvoice', invoice);
  }
}
