import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'map'
})
export class MapPipe implements PipeTransform {
    transform(items: any[], key: string): any[] {
        if (!items || !Array.isArray(items)) {
            return [];
        }
        return items.map(item => item[key]);
    }
}
