import { Injectable } from '@angular/core';
import { BankAccount } from './bank-account';

declare let electron: any;

@Injectable()
export class BankAccountsService {
  ipc: any;

  constructor() {
    this.ipc = electron.ipcRenderer;
  }

  getBankAccounts(compRef: any): void {
    this.ipc.send('loadBankAccounts');
    this.ipc.on('bankAccountsLoaded', (event, result) => {
      compRef.bankAccounts = result;
      const pageElement: any = document.getElementById('bankAccountPage');
      if (pageElement !== null) {
        pageElement.click();
      }
    });
  }

  getBankAccount(compRef: any, bankAccountId: number): void {
    this.ipc.send('getBankAccount', bankAccountId);
    this.ipc.on('bankAccountRetrieved', (event, result) => {
      compRef.bankAccount = result;
    });
  }

  save(bankAccount: BankAccount): void {
    this.ipc.send('insertBankAccount', bankAccount);
  }

  update(bankAccount: BankAccount): void {
    this.ipc.send('updateBankAccount', bankAccount);
  }

  delete(bankAccount: BankAccount): void {
    this.ipc.send('deleteBankAccount', bankAccount);
  }
}
