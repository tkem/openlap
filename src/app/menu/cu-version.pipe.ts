import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cuversion', pure: true,
    standalone: false
})
@Injectable()
export class CuVersionPipe implements PipeTransform {
  transform(value: string): string {
    // newer CUs use inital "8" instead of "5" for hardware variant, 
    // and 4-digit numbers seem to be more custom within the community
    // return value ? value.replace(/^5(\d)(\d+)$/, '$1.$2') : '...';
    return value || '????';
  }
}
