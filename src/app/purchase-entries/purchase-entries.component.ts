import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchaseEntriesService } from './purchase-entries.service';
import { InvoicesService } from '../invoices/invoices.service';
import { InvoiceSummariesService } from '../invoice-summaries/invoice-summaries.service';
import { Invoice } from '../invoices/invoice';
import { PurchaseEntry } from './purchase-entry';
import { InvoiceSummary } from '../invoice-summaries/invoice-summary';

@Component({
  selector: 'app-purchase-entries',
  templateUrl: './purchase-entries.component.html',
  styleUrls: ['./purchase-entries.component.scss']
})
export class PurchaseEntriesComponent implements OnInit {
  invoice: Invoice;
  purchaseEntry: PurchaseEntry;
  invoiceSummary: InvoiceSummary;
  purchaseEntries: PurchaseEntry[];
  isUpdate: Boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private invoicesService: InvoicesService,
    private invoiceSummariesService: InvoiceSummariesService,
    private purchaseEntriesService: PurchaseEntriesService
  ) {
    this.isUpdate = false;
    this.reset();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const invoiceId = params['id'];
      this.getInvoice(invoiceId);
      this.getInvoiceSummary(invoiceId);
      this.getPurchaseEntries(invoiceId);
    });
  }

  showNotification(type, message) {
    switch (type) {
      case 'info':
        this.toastr.info(
          `<span class="now-ui-icons ui-1_bell-53"></span>
            <b>INFO</b> - ${message}`,
          '',
          {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-info alert-with-icon',
            positionClass: 'toast-top-right'
          }
        );
        break;
      case 'success':
        this.toastr.success(
          `<span class="now-ui-icons ui-1_bell-53"></span>
            <b>SUCCESS</b> - ${message}`,
          '',
          {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-success alert-with-icon',
            positionClass: 'toast-top-right'
          }
        );
        break;
      case 'error':
        this.toastr.error(
          `<span class="now-ui-icons ui-1_bell-53"></span>
            <b>ERROR</b> - ${message}`,
          '',
          {
            timeOut: 8000,
            enableHtml: true,
            closeButton: true,
            toastClass: 'alert alert-danger alert-with-icon',
            positionClass: 'toast-top-right'
          }
        );
        break;
      default:
        break;
    }
  }

  getPurchaseEntries(invoiceId: number): void {
    this.purchaseEntriesService.getPurchaseEntries(this, invoiceId);
    this.populateInvoiceSummary();
    this.reset();
    this.showNotification('info', 'purchaseEntries list loaded successfully.');
  }

  reset(): void {
    this.purchaseEntry = new PurchaseEntry();
  }

  save(): void {
    this.purchaseEntry.fkIdInvoice = this.invoice.id;
    this.purchaseEntry.purchaseAmount =
      this.purchaseEntry.quantity * this.purchaseEntry.rate;
    this.purchaseEntry.purchaseAmount -=
      0.01 * this.purchaseEntry.discount * this.purchaseEntry.purchaseAmount;
    this.purchaseEntriesService.save(this.purchaseEntry);
    this.getPurchaseEntries(this.invoice.id);
    this.showNotification('success', 'purchaseEntry created successfully.');
  }

  update(): void {
    this.purchaseEntriesService.update(this.purchaseEntry);
    this.isUpdate = false;
    this.getPurchaseEntries(this.invoice.id);
    this.showNotification('success', 'purchaseEntry updated successfully.');
  }

  cancel(): void {
    this.isUpdate = false;
    this.reset();
    this.showNotification('info', 'you cancelled update operation.');
  }

  edit(entry: PurchaseEntry): void {
    this.isUpdate = true;
    this.purchaseEntry = Object.assign({}, entry);
    this.showNotification('info', 'edit entries in form & click save.');
  }

  delete(entry: PurchaseEntry): void {
    this.purchaseEntriesService.delete(entry);
    this.getPurchaseEntries(this.invoice.id);
    this.showNotification('success', 'purchaseEntry deleted successfully.');
  }

  getInvoice(invoiceId: number): void {
    this.invoicesService.getInvoice(this, invoiceId);
    this.showNotification('info', 'invoice loaded successfully.');
  }

  getInvoiceSummary(invoiceId: number): void {
    this.invoiceSummariesService.getInvoiceSummary(this, invoiceId);
    this.showNotification('info', 'invoice summary loaded successfully.');
  }

  populateInvoiceSummary(): void {
    if (this.purchaseEntries) {
      if (this.invoiceSummary === null) {
        this.invoiceSummary = new InvoiceSummary();
      }

      this.invoiceSummary.subTotal = 0;
      this.purchaseEntries.forEach((purchaseEntry: PurchaseEntry) => {
        this.invoiceSummary.subTotal =
          this.invoiceSummary.subTotal + purchaseEntry.purchaseAmount;
      });
      this.invoiceSummary.subTotal += this.invoice.transportCharges;
      this.invoiceSummary.cgstAmount =
        0.01 * this.invoiceSummary.subTotal * this.invoice.cgstRate;
      this.invoiceSummary.sgstAmount =
        0.01 * this.invoiceSummary.subTotal * this.invoice.sgstRate;
      this.invoiceSummary.totalTaxAmount =
        this.invoiceSummary.cgstAmount + this.invoiceSummary.sgstAmount;
      this.invoiceSummary.totalTaxAmountInWords = 'My lovely amount';
      this.invoiceSummary.total = Math.round(
        this.invoiceSummary.subTotal + this.invoiceSummary.totalTaxAmount
      );
      this.invoiceSummary.saleRoundOff =
        this.invoiceSummary.total -
        (this.invoiceSummary.subTotal + this.invoiceSummary.totalTaxAmount);
      this.invoiceSummary.totalInWords = 'My lovely amount';
      this.invoiceSummary.fkIdInvoice = this.invoice.id;

      if (this.invoiceSummary.id) {
        this.invoiceSummariesService.update(this.invoiceSummary);
      } else {
        this.invoiceSummariesService.save(this.invoiceSummary);
      }
    } else if (this.invoiceSummary) {
      this.invoiceSummariesService.delete(this.invoiceSummary);
    }
  }
}
