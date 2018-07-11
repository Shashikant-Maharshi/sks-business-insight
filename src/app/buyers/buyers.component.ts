import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BuyersService } from './buyers.service';
import { StatesService } from '../states/states.service';
import { Buyer } from './buyer';
import { State } from '../states/state';

@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.scss']
})
export class BuyersComponent implements OnInit {
  buyer: Buyer;
  buyers: Buyer[];
  states: State[];
  isUpdate: Boolean;

  constructor(
    private toastr: ToastrService,
    private buyersService: BuyersService,
    private statesService: StatesService
  ) {
    this.isUpdate = false;
    this.reset();
  }

  ngOnInit() {
    this.getBuyers();
    this.getStates();
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

  getBuyers(): void {
    this.buyersService.getBuyers(this);
    this.reset();
    this.showNotification('info', 'buyers list loaded successfully.');
  }

  reset(): void {
    this.buyer = new Buyer();
  }

  save(): void {
    this.buyersService.save(this.buyer);
    this.getBuyers();
    this.showNotification('success', 'buyer created successfully.');
  }

  update(): void {
    this.buyersService.update(this.buyer);
    this.isUpdate = false;
    this.getBuyers();
    this.showNotification('success', 'buyer updated successfully.');
  }

  cancel(): void {
    this.isUpdate = false;
    this.reset();
    this.showNotification('info', 'you cancelled update operation.');
  }

  edit(entry: Buyer): void {
    this.isUpdate = true;
    this.buyer = Object.assign({}, entry);
    this.showNotification('info', 'edit entries in form & click save.');
  }

  delete(entry: Buyer): void {
    this.buyersService.delete(entry);
    this.getBuyers();
    this.showNotification('success', 'buyer deleted successfully.');
  }

  getStates(): void {
    this.statesService.getStates(this);
    this.reset();
    this.showNotification('info', 'states list loaded successfully.');
  }

  getState(buyer: Buyer): any {
    return this.states.filter(state => state.id === buyer.fkIdState);
  }
}
