import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private successMessageSource = new Subject<string>();
  private errorMessageSource = new Subject<string>();

  successMessage$ = this.successMessageSource.asObservable();
  errorMessage$ = this.errorMessageSource.asObservable();

  constructor() {}

  showSuccessMessage(message: string) {
    this.successMessageSource.next(message);
  }

  showErrorMessage(message: string) {
    this.errorMessageSource.next(message);
  }
}
