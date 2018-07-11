export class InvoiceSummary {
  id: number;
  subTotal: number;
  cgstAmount: number;
  sgstAmount: number;
  totalTaxAmount: number;
  totalTaxAmountInWords: string;
  saleRoundOff: number;
  total: number;
  totalInWords: string;
  fkIdInvoice: number;
  createdAt: string;
  updatedAt: string;
}
