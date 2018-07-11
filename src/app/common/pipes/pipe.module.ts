import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormatDateTime } from './format-date-time.pipe';

@NgModule({
  declarations: [FormatDateTime],
  imports: [CommonModule],
  exports: [FormatDateTime]
})
export class PipeModule {}
