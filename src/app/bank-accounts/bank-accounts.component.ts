import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccount } from './bank-account';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.scss']
})
export class BankAccountsComponent implements OnInit {
  bankAccount: BankAccount;
  bankAccounts: BankAccount[];
  isUpdate: Boolean;

  constructor(
    private toastr: ToastrService,
    private bankAccountsService: BankAccountsService
  ) {
    this.isUpdate = false;
    this.reset();
  }

  ngOnInit() {
    this.getBankAccounts();
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

  getBankAccounts(): void {
    this.bankAccountsService.getBankAccounts(this);
    this.reset();
    this.showNotification('info', 'bank accounts list loaded successfully.');
  }

  reset(): void {
    this.bankAccount = new BankAccount();
  }

  save(): void {
    this.bankAccountsService.save(this.bankAccount);
    this.getBankAccounts();
    this.showNotification('success', 'bank account created successfully.');
  }

  update(): void {
    this.bankAccountsService.update(this.bankAccount);
    this.isUpdate = false;
    this.getBankAccounts();
    this.showNotification('success', 'bank account updated successfully.');
  }

  cancel(): void {
    this.isUpdate = false;
    this.reset();
    this.showNotification('info', 'you cancelled update operation.');
  }

  edit(entry: BankAccount): void {
    this.isUpdate = true;
    this.bankAccount = Object.assign({}, entry);
    this.showNotification('info', 'edit entries in form & click save.');
  }

  delete(entry: BankAccount): void {
    this.bankAccountsService.delete(entry);
    this.getBankAccounts();
    this.showNotification('success', 'bank account deleted successfully.');
  }
}
