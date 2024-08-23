import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../../../services/dataService/data.service';
import { catchError, map, of, switchMap } from 'rxjs';
import * as ProductsActions from '../actions/products.actions';
import { Dessert } from '../../../models/product.model';

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(() =>
        this.dataService.getProducts().pipe(
          map((products: Dessert[]) => {
            return ProductsActions.loadProductsSuccess({ products });
          }),
          catchError((error) =>
            of(ProductsActions.loadProductsError({ error }))
          )
        )
      )
    )
  );
}
