export class PurchaseEntry {
  id: number;
  packageNote: string;
  description: string;
  hsnCode: string;
  quantity: number;
  rate: number;
  discount: number;
  purchaseAmount: number;
  fkIdInvoice: number;
  createdAt: string;
  updatedAt: string;
}
