import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyProfilesService } from './company-profiles.service';
import { CompanyProfile } from './company-profile';
import { State } from '../states/state';
import { BankAccount } from '../bank-accounts/bank-account';
import { StatesService } from '../states/states.service';
import { BankAccountsService } from '../bank-accounts/bank-accounts.service';

@Component({
  selector: 'app-company-profiles',
  templateUrl: './company-profiles.component.html',
  styleUrls: ['./company-profiles.component.scss']
})
export class CompanyProfilesComponent implements OnInit {
  companyProfile: CompanyProfile;
  companyProfiles: CompanyProfile[];
  states: State[];
  bankAccounts: BankAccount[];
  isUpdate: Boolean;

  constructor(
    private toastr: ToastrService,
    private companyProfilesService: CompanyProfilesService,
    private statesService: StatesService,
    private bankAccountsService: BankAccountsService
  ) {
    this.isUpdate = false;
    this.reset();
  }

  ngOnInit() {
    this.getCompanyProfiles();
    this.getStates();
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

  getCompanyProfiles(): void {
    this.companyProfilesService.getCompanyProfiles(this);
    this.reset();
    this.showNotification('info', 'company profiles list loaded successfully.');
  }

  reset(): void {
    this.companyProfile = new CompanyProfile();
  }

  save(): void {
    this.companyProfilesService.save(this.companyProfile);
    this.getCompanyProfiles();
    this.showNotification('success', 'company profile created successfully.');
  }

  update(): void {
    this.companyProfilesService.update(this.companyProfile);
    this.isUpdate = false;
    this.getCompanyProfiles();
    this.showNotification('success', 'company profile updated successfully.');
  }

  cancel(): void {
    this.isUpdate = false;
    this.reset();
    this.showNotification('info', 'you cancelled update operation.');
  }

  edit(entry: CompanyProfile): void {
    this.isUpdate = true;
    this.companyProfile = Object.assign({}, entry);
    this.showNotification('info', 'edit entries in form & click save.');
  }

  delete(entry: CompanyProfile): void {
    this.companyProfilesService.delete(entry);
    this.getCompanyProfiles();
    this.showNotification('success', 'company profile deleted successfully.');
  }

  getStates(): void {
    this.statesService.getStates(this);
    this.reset();
    this.showNotification('info', 'states list loaded successfully.');
  }

  getBankAccounts(): void {
    this.bankAccountsService.getBankAccounts(this);
    this.reset();
    this.showNotification('info', 'bank accounts list loaded successfully.');
  }

  getState(companyProfile: CompanyProfile): any {
    return this.states.filter(state => state.id === companyProfile.fkIdState);
  }

  getBankAccount(companyProfile: CompanyProfile): any {
    return this.bankAccounts.filter(
      bankAccount => bankAccount.id === companyProfile.fkIdBankAccount
    );
  }
}
