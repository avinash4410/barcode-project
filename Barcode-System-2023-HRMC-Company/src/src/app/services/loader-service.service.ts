import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderServiceService {
  private loaderVisible = false;

  showLoader() {
    this.loaderVisible = true;
  }

  hideLoader() {
    this.loaderVisible = false;
  }

  isLoaderVisible() {
    return this.loaderVisible;
  }
}
