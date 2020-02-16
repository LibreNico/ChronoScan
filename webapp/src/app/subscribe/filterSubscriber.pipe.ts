import { Pipe, PipeTransform } from '@angular/core';
import { Subscriber } from './subscriber.model'; 

@Pipe({
  name: 'filter'
})
export class FilterSubscriberPipe implements PipeTransform {

  transform(items: Subscriber[], searchText: string): Subscriber[] {

    // return empty array if array is falsy
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!searchText) { return items; }

    // convert the searchText to lower case
    const term = searchText.toLowerCase();

    // retrun the filtered array
    return items.filter(item =>   item.lastName.toLowerCase().includes(term) 
        ||  item.firstName.toLowerCase().includes(term) 
        ||  item.club && item.club.toLowerCase().includes(term) );

   }
}