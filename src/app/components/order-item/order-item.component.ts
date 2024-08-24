import { Component, Input } from '@angular/core';
import { BaseListItemComponent } from "../base-list-item/base-list-item.component";
import { OrderItem } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [BaseListItemComponent, CurrencyPipe],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.sass'
})
export class OrderItemComponent {
  @Input() orderItem!: OrderItem;

}
