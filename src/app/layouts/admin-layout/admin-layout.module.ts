import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { SqliteexampleComponent } from '../../sqliteexample/sqliteexample.component';
import { SqliteexampleService } from '../../sqliteexample/sqliteexample.service';
import { StatesComponent } from '../../states/states.component';
import { StatesService } from '../../states/states.service';
import { BillTypesComponent } from '../../bill-types/bill-types.component';
import { BillTypesService } from '../../bill-types/bill-types.service';
import { BankAccountsComponent } from '../../bank-accounts/bank-accounts.component';
import { BankAccountsService } from '../../bank-accounts/bank-accounts.service';
import { CompanyProfilesComponent } from '../../company-profiles/company-profiles.component';
import { CompanyProfilesService } from '../../company-profiles/company-profiles.service';
import { BuyersComponent } from '../../buyers/buyers.component';
import { BuyersService } from '../../buyers/buyers.service';
import { InvoicesComponent } from '../../invoices/invoices.component';
import { InvoicesService } from '../../invoices/invoices.service';
import { PurchaseEntriesComponent } from '../../purchase-entries/purchase-entries.component';
import { PurchaseEntriesService } from '../../purchase-entries/purchase-entries.service';
import { InvoiceSummariesComponent } from '../../invoice-summaries/invoice-summaries.component';
import { InvoiceSummariesService } from '../../invoice-summaries/invoice-summaries.service';
import { InvoiceViewerComponent } from '../../invoice-viewer/invoice-viewer.component';
import { PipeModule } from '../../common/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    PipeModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    SqliteexampleComponent,
    StatesComponent,
    BillTypesComponent,
    BankAccountsComponent,
    CompanyProfilesComponent,
    BuyersComponent,
    InvoicesComponent,
    PurchaseEntriesComponent,
    InvoiceSummariesComponent,
    InvoiceViewerComponent
  ],
  providers: [
    SqliteexampleService,
    StatesService,
    BillTypesService,
    BankAccountsService,
    CompanyProfilesService,
    BuyersService,
    InvoicesService,
    PurchaseEntriesService,
    InvoiceSummariesService
  ]
})
export class AdminLayoutModule {}
