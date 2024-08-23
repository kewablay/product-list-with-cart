import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-list-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './base-list-item.component.html',
  styleUrl: './base-list-item.component.sass',
})
export class BaseListItemComponent {
  @Input() Item!: any;
  totalPrice: number = 0;

  onInit() {
    this.totalPrice = this.Item.price * this.Item.quantity;
  }
}
