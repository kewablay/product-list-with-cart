import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/dataService/data.service';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { CartComponent } from "./components/cart/cart.component";
import { OrderComponent } from "./components/order/order.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, CartComponent, OrderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'product-list-with-cart';
  products: any = [];

  constructor(private data: DataService) {
    // this.data.getData().subscribe((data) => {
    //   this.products = data;
    //   console.log('Recieved Products: ', this.products);
    // });
  }
  
}
