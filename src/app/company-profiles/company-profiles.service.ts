import { Injectable } from '@angular/core';
import { CompanyProfile } from './company-profile';

declare let electron: any;

@Injectable()
export class CompanyProfilesService {
  ipc: any;

  constructor() {
    this.ipc = electron.ipcRenderer;
  }

  getCompanyProfiles(compRef: any): void {
    this.ipc.send('loadCompanyProfiles');
    this.ipc.on('companyProfilesLoaded', (event, result) => {
      compRef.companyProfiles = result;
      const pageElement: any = document.getElementById('companyProfilePage');
      if (pageElement !== null) {
        pageElement.click();
      }
    });
  }

  getCompanyProfile(compRef: any, companyProfileId: number): void {
    this.ipc.send('getCompanyProfile', companyProfileId);
    this.ipc.on('companyProfileRetrieved', (event, result) => {
      compRef.companyProfile = result;
    });
  }

  save(companyProfile: CompanyProfile): void {
    this.ipc.send('insertCompanyProfile', companyProfile);
  }

  update(companyProfile: CompanyProfile): void {
    this.ipc.send('updateCompanyProfile', companyProfile);
  }

  delete(companyProfile: CompanyProfile): void {
    this.ipc.send('deleteCompanyProfile', companyProfile);
  }
}
