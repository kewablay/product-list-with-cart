import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // if app ever needs other modals it will go into the modals object
  private modals: { [key: string]: boolean } = {};

  constructor() {}

  openModal(modalName: string) {
    this.modals[modalName] = true;
  }

  closeModal(modalName: string) {
    this.modals[modalName] = false;
  }

  isModalOpen(modalName: string) {
    return this.modals[modalName] || false;
  }
}
