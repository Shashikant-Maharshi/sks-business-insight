import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InvoicesService } from './invoices.service';
import { Invoice } from './invoice';
import { BillType } from '../bill-types/bill-type';
import { BillTypesService } from '../bill-types/bill-types.service';
import { PurchaseEntry } from '../purchase-entries/purchase-entry';
import { PurchaseEntriesService } from '../purchase-entries/purchase-entries.service';
import { CompanyProfilesService } from '../company-profiles/company-profiles.service';
import { CompanyProfile } from '../company-profiles/company-profile';
import { BuyersService } from '../buyers/buyers.service';
import { Buyer } from '../buyers/buyer';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  invoice: Invoice;
  invoices: Invoice[];
  billTypes: BillType[];
  purchaseEntries: PurchaseEntry[];
  companyProfiles: CompanyProfile[];
  buyers: Buyer[];
  isUpdate: Boolean;

  constructor(
    private toastr: ToastrService,
    private invoicesService: InvoicesService,
    private billTypesService: BillTypesService,
    private purchaseEntriesService: PurchaseEntriesService,
    private companyProfilesService: CompanyProfilesService,
    private buyersService: BuyersService
  ) {
    this.isUpdate = false;
    this.reset();
  }

  ngOnInit() {
    this.getBillTypes();
    this.getCompanyProfiles();
    this.getBuyers();
    this.getInvoices();
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

  getInvoices(): void {
    this.invoicesService.getInvoices(this);
    this.reset();
    this.showNotification('info', 'invoices list loaded successfully.');
  }

  reset(): void {
    this.invoice = new Invoice();
  }

  save(): void {
    this.invoicesService.save(this.invoice);
    this.getInvoices();
    this.showNotification('success', 'invoice created successfully.');
  }

  update(): void {
    this.invoicesService.update(this.invoice);
    this.isUpdate = false;
    this.getInvoices();
    this.showNotification('success', 'invoice updated successfully.');
  }

  cancel(): void {
    this.isUpdate = false;
    this.reset();
    this.showNotification('info', 'you cancelled update operation.');
  }

  edit(entry: Invoice): void {
    this.isUpdate = true;
    this.invoice = Object.assign({}, entry);
    this.showNotification('info', 'edit entries in form & click save.');
  }

  delete(entry: Invoice): void {
    this.invoicesService.delete(entry);
    this.getInvoices();
    this.showNotification('success', 'invoice deleted successfully.');
  }

  getBillTypes(): void {
    this.billTypesService.getBillTypes(this);
    this.reset();
    this.showNotification('info', 'billl types loaded successfully.');
  }

  getBillType(invoice: Invoice): any {
    return this.billTypes.filter(
      billType => billType.id === invoice.fkIdBillType
    );
  }

  getCompanyProfiles(): void {
    this.companyProfilesService.getCompanyProfiles(this);
    this.showNotification('info', 'company profiles loaded successfully.');
  }

  getCompanyProfile(invoice: Invoice): any {
    return this.companyProfiles.filter(
      companyProfile => companyProfile.id === invoice.fkIdCompanyProfile
    );
  }

  getBuyers(): void {
    this.buyersService.getBuyers(this);
    this.showNotification('info', 'buyers loaded successfully.');
  }

  getBuyer(invoice: Invoice): any {
    return this.buyers.filter(buyer => buyer.id === invoice.fkIdBuyer);
  }

  getPurcahseEntriesCount(invoice: Invoice): number {
    this.purchaseEntriesService.getPurchaseEntries(this, invoice.id);
    return this.purchaseEntries.length;
  }
}
