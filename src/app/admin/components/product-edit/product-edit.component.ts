import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../../core/services/products/products.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MyValidate } from 'src/app/utils/validator';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;
  id: string;
  constructor(
    private formBuilder: FormBuilder,
    private productsServie: ProductsService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productsServie.getProduct(this.id).
      subscribe((product) => {
        this.form.patchValue(product);
      });
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: [0, [Validators.required, MyValidate.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]]
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsServie.updateProduct(this.id, product)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['./admin/products']);
      });
    }
  }

  get priceField() {
    return this.form.get('price');
  }
}
