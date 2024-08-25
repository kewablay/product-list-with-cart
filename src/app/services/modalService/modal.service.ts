import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // if app ever needs other modals it will go into the modals object
  private modals: { [key: string]: boolean } = {};

   // Toggle scroll lock based on whether any modal is open
   private toggleScrollLock() {
    const isAnyModalOpen = Object.values(this.modals).some((isOpen) => isOpen);
    if (isAnyModalOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
  constructor() {}

  openModal(modalName: string) {
    this.modals[modalName] = true;
    this.toggleScrollLock();
  }

  closeModal(modalName: string) {
    this.modals[modalName] = false;
    this.toggleScrollLock();
  }

  isModalOpen(modalName: string) {
    return this.modals[modalName] || false;
  }
}
