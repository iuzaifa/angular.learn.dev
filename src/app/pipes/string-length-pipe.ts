import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringLength',
})
export class StringLengthPipe implements PipeTransform {
  transform(value: string): number {
    return value.length;
  }
}
