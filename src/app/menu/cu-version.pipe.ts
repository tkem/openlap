import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'cuversion', pure: true})
@Injectable()
export class CuVersionPipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.replace(/^5(\d)(\d+)$/, '$1.$2') : '';
  }
}
