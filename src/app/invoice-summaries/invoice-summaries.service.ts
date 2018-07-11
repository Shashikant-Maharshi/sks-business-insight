import { Injectable } from '@angular/core';
import { InvoiceSummary } from './invoice-summary';

declare let electron: any;

@Injectable()
export class InvoiceSummariesService {
  ipc: any;

  constructor() {
    this.ipc = electron.ipcRenderer;
  }

  getInvoiceSummary(compRef: any, invoiceId: number): void {
    this.ipc.send('getInvoiceSummary', invoiceId);
    this.ipc.on('invoiceSummaryRetrieved', (event, result) => {
      compRef.invoiceSummary = result;
    });
  }

  save(invoiceSummary: InvoiceSummary): void {
    this.ipc.send('insertInvoiceSummary', invoiceSummary);
  }

  update(invoiceSummary: InvoiceSummary): void {
    this.ipc.send('updateInvoiceSummary', invoiceSummary);
  }

  delete(invoiceSummary: InvoiceSummary): void {
    this.ipc.send('deleteInvoiceSummary', invoiceSummary);
  }
}
