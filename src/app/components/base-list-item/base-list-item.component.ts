import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-base-list-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './base-list-item.component.html',
  styleUrl: './base-list-item.component.sass',
})
export class BaseListItemComponent {
  @Input() Item!: CartItem;
}
