import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName',
})
export class ShortNamePipe implements PipeTransform {
  transform(fullname: string): string {
    const namearr = fullname.split(' ');
    // Fullname is Abu Huzaifa , after spliting i get namearr[0] Abu, namearr[1] Huzaifa
    if (namearr.length < 2){
      return fullname; // incase i have first name only 
    }

    const firstname = namearr[0].charAt(0).toUpperCase();
    const lastnane = namearr[1];

    return `${firstname}. ${lastnane}`;
  }
}
