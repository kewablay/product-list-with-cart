import { Component } from '@angular/core';
import { BaseListItemComponent } from "../base-list-item/base-list-item.component";

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [BaseListItemComponent],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.sass'
})
export class OrderItemComponent {

}
