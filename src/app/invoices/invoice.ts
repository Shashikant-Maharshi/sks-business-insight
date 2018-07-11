export class Invoice {
  id: number;
  fkIdBillType: number;
  fkIdCompanyProfile: number;
  fkIdBuyer: number;
  invoiceNumber: string;
  invoiceDate: Date;
  eWayBillNumber: string;
  deliveryNote: string;
  paymentMode: string;
  supplierReference: string;
  otherReferences: string;
  despatchDocumentNumber: string;
  deliveryNoteDate: Date;
  despatchThrough: string;
  destination: string;
  termsOfDelivery: string;
  transportCharges: number;
  cgstRate: number;
  sgstRate: number;
  createdAt: string;
  updatedAt: string;
}
