import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.sass',
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Input() isOpen: boolean = false;

  constructor() {}

  ngOninit() {
    console.log("isMOdal open in base modal: ", this.isOpen);
  }


  handleCloseModal() {
    this.closeModal.emit();
  }
}
