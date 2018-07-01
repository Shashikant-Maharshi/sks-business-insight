import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StatesService } from './states.service';
import { State } from './state';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {
  state: State;
  states: State[];
  isUpdate: Boolean;

  constructor(
    private toastr: ToastrService,
    private statesService: StatesService
  ) {
    this.isUpdate = false;
    this.reset();
  }

  ngOnInit() {
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

  getStates(): void {
    this.statesService.getStates(this);
    this.reset();
    this.showNotification('info', 'states list loaded successfully.');
  }

  reset(): void {
    this.state = new State();
  }

  save(): void {
    this.statesService.save(this.state);
    this.getStates();
    this.showNotification('success', 'state created successfully.');
  }

  update(): void {
    console.log(
      `update called - name: ${this.state.name}, code: ${this.state.code}`
    );
    this.statesService.update(this.state);
    this.getStates();
    this.showNotification('success', 'state updated successfully.');
  }

  cancel(): void {
    this.isUpdate = false;
    this.reset();
    this.showNotification('info', 'you cancelled update operation.');
  }

  edit(entry: State): void {
    this.isUpdate = true;
    this.state = Object.assign({}, entry);
    this.showNotification('info', 'edit entries in form & click save.');
  }

  delete(entry: State): void {
    console.log(`delete called - name: ${entry.name}, code: ${entry.code}`);
    this.statesService.delete(entry);
    this.getStates();
    this.showNotification('success', 'state deleted successfully.');
  }
}
