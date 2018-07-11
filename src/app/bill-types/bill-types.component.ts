import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BillTypesService } from './bill-types.service';
import { BillType } from './bill-type';

@Component({
  selector: 'app-bill-types',
  templateUrl: './bill-types.component.html',
  styleUrls: ['./bill-types.component.scss']
})
export class BillTypesComponent implements OnInit {
  billType: BillType;
  billTypes: BillType[];
  isUpdate: Boolean;

  constructor(
    private toastr: ToastrService,
    private billTypesService: BillTypesService
  ) {
    this.isUpdate = false;
    this.reset();
  }

  ngOnInit() {
    this.getBillTypes();
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

  getBillTypes(): void {
    this.billTypesService.getBillTypes(this);
    this.reset();
    this.showNotification('info', 'bill type list loaded successfully.');
  }

  reset(): void {
    this.billType = new BillType();
  }

  save(): void {
    this.billTypesService.save(this.billType);
    this.getBillTypes();
    this.showNotification('success', 'bill type created successfully.');
  }

  update(): void {
    this.billTypesService.update(this.billType);
    this.isUpdate = false;
    this.getBillTypes();
    this.showNotification('success', 'bill type updated successfully.');
  }

  cancel(): void {
    this.isUpdate = false;
    this.reset();
    this.showNotification('info', 'you cancelled update operation.');
  }

  edit(entry: BillType): void {
    this.isUpdate = true;
    this.billType = Object.assign({}, entry);
    this.showNotification('info', 'edit entries in form & click save.');
  }

  delete(entry: BillType): void {
    this.billTypesService.delete(entry);
    this.getBillTypes();
    this.showNotification('success', 'bill type deleted successfully.');
  }
}
