import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/*
 * Formats value to passed signature
 * Takes an signature argument that defaults to dd/MM/yyyy
 * Usage:
 *   value | formatDateTime:signature
 * Example:
 *   {{ 2018-07-07 07:39:38.520 +00:00 | formatDateTime:'dd/MM/yyyy' }}
 *   formats to: 07/07/2018
*/
@Pipe({ name: 'formatDateTime' })
export class FormatDateTime implements PipeTransform {
  transform(value: Date, signature: string): string {
    const defaultSignature = 'DD/MM/YYYY';

    signature = signature ? signature : defaultSignature;

    return moment(value).format(signature);
  }
}
