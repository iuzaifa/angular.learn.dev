import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'curencyConvert',
})
export class CurencyConvertPipe implements PipeTransform {
  transform(amount: number, rate: number): number {
    return amount*rate;
  }
}
