import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { InvoicesService } from '../invoices/invoices.service';
import { Invoice } from '../invoices/invoice';
import { CompanyProfilesService } from '../company-profiles/company-profiles.service';
import { CompanyProfile } from '../company-profiles/company-profile';
import { BuyersService } from '../buyers/buyers.service';
import { Buyer } from '../buyers/buyer';
import { BillTypesService } from '../bill-types/bill-types.service';
import { BillType } from '../bill-types/bill-type';
import { StatesService } from '../states/states.service';
import { State } from '../states/state';
import { BankAccountsService } from '../bank-accounts/bank-accounts.service';
import { BankAccount } from '../bank-accounts/bank-account';
import { PurchaseEntriesService } from '../purchase-entries/purchase-entries.service';
import { PurchaseEntry } from '../purchase-entries/purchase-entry';
import { InvoiceSummariesService } from '../invoice-summaries/invoice-summaries.service';
import { InvoiceSummary } from '../invoice-summaries/invoice-summary';

@Component({
  selector: 'app-invoice-viewer',
  templateUrl: './invoice-viewer.component.html',
  styleUrls: ['./invoice-viewer.component.scss']
})
export class InvoiceViewerComponent implements OnInit {
  @ViewChild('invoiceContent') content: ElementRef;
  invoice: Invoice;
  purchaseEntries: PurchaseEntry[];
  invoiceSummary: InvoiceSummary;
  companyProfiles: CompanyProfile[];
  buyers: Buyer[];
  billTypes: BillType[];
  states: State[];
  bankAccounts: BankAccount[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private invoicesService: InvoicesService,
    private companyProfilesService: CompanyProfilesService,
    private buyersService: BuyersService,
    private billTypesService: BillTypesService,
    private statesService: StatesService,
    private bankAccountsService: BankAccountsService,
    private purchaseEntriesService: PurchaseEntriesService,
    private invoiceSummariesService: InvoiceSummariesService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const invoiceId = params['id'];
      this.getInvoice(invoiceId);
      this.getInvoiceSummary(invoiceId);
      this.getPurchaseEntry(invoiceId);
    });

    this.getBillTypes();
    this.getCompanyProfiles();
    this.getBuyers();
    this.getStates();
    this.getBankAccounts();
  }

  downloadTaxInvoice() {
    /* const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': (element, renderer) => true
    };

    const content = this.content.nativeElement;

    doc.setFont('courier');
    doc.fromHTML(content.innerHTML, 8, 8, {
      width: 595,
      elementHandlers: specialElementHandlers
    });

    doc.save('test.pdf'); */

    const content = this.content.nativeElement;

    html2canvas(content).then(function(canvas) {
      const img = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const width = doc.internal.pageSize.width;
      const height = doc.internal.pageSize.height;
      // doc.addImage(img, 'JPEG', 5, 20);
      doc.addImage(img, 'JPEG', 0, 0, width, height);

      doc.save('testCanvas.pdf');
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

  getInvoice(invoiceId: number): void {
    this.invoicesService.getInvoice(this, invoiceId);
    this.showNotification('info', 'invoice loaded successfully.');
  }

  getPurchaseEntry(invoiceId: number): void {
    this.purchaseEntriesService.getPurchaseEntries(this, invoiceId);
    this.showNotification('info', 'purchase entries loaded successfully.');
  }

  getInvoiceSummary(invoiceId: number): void {
    this.invoiceSummariesService.getInvoiceSummary(this, invoiceId);
    this.showNotification('info', 'invoice summary loaded successfully.');
  }

  getCompanyProfiles(): void {
    this.companyProfilesService.getCompanyProfiles(this);
    this.showNotification('info', 'company profiles loaded successfully.');
  }

  getBuyers(): void {
    this.buyersService.getBuyers(this);
    this.showNotification('info', 'buyers loaded successfully.');
  }

  getBillTypes(): void {
    this.billTypesService.getBillTypes(this);
    this.showNotification('info', 'bill types loaded successfully.');
  }

  getStates(): void {
    this.statesService.getStates(this);
    this.showNotification('info', 'states loaded successfully.');
  }

  getBankAccounts(): void {
    this.bankAccountsService.getBankAccounts(this);
    this.showNotification('info', 'bank accounts loaded successfully.');
  }

  getCompanyProfile(invoice: Invoice): any {
    return this.companyProfiles.filter(
      companyProfile => companyProfile.id === invoice.fkIdCompanyProfile
    );
  }

  getBuyer(invoice: Invoice): any {
    return this.buyers.filter(buyer => buyer.id === invoice.fkIdBuyer);
  }

  getBillType(invoice: Invoice): any {
    return this.billTypes.filter(
      billType => billType.id === invoice.fkIdBillType
    );
  }

  getState(entity: any): any {
    return this.states.filter(state => state.id === entity.fkIdState);
  }

  getBankAccount(companyProfile: CompanyProfile): any {
    return this.bankAccounts.filter(
      bankAccount => bankAccount.id === companyProfile.fkIdBankAccount
    );
  }
}
