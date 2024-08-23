import { Component, Input } from '@angular/core';
import { Dessert } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.sass',
})
export class ProductItemComponent {
@Input() product!: Dessert;
  
}
