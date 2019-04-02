import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RestaurantService } from '../services/rstrnt.service';
import { Restaurant } from '../models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  errors: string[] = [];
  thisRestaurant = null;
  updatedRestaurant: any = null;


   restaurantId: string;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router,
  ) {

    this.route.paramMap.subscribe(
      params => (this.restaurantId = params.get('id')));
    console.log('From edit.component.ts, this is this.restaurantId: ', this.restaurantId);
    this.restaurantService.getRestaurant(this.restaurantId)
      .subscribe(restaurantReturned => {
        this.thisRestaurant = restaurantReturned;
        this.updatedRestaurant = this.thisRestaurant.data;
    });
   }

  ngOnInit() {
  }

  onSubmit(): void {
    this.restaurantService
      .updateRestaurant(this.restaurantId, this.updatedRestaurant)
      .subscribe((result: any) => {
        console.log(result);
        if (result.error) {
          console.log(result.error);
          this.errors = result.error;
        } else {
          this.router.navigate(['/restaurants']);
        }

      });
  }

  onDelete(product: Restaurant): void {
    this.restaurantService.removeRestaurant(this.restaurantId).subscribe(result => {
      console.log('this is the onDelete() route', this.router);
      this.router.navigate(['/restaurants']);
    });
    console.log('ran onDelete()');

  }
}


