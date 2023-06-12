import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailLink',
})
export class EmailLinkPipe implements PipeTransform {
  transform(email: string): string {
    return `<a href="mailto:${email}">${email}</a>`;
  }
}
