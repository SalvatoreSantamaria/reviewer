import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RestaurantService } from '../services/rstrnt.service';
import { Restaurant } from '../models';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models';



@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {


  errors: string[] = [];
  newUser: User = new User();


  thisRestaurant = null;
  thisP = null;
  restaurantId: any;
  constructor(
    private restaurantService: RestaurantService,
    private readonly route: ActivatedRoute,
    private router: Router
  ) {


    this.route.paramMap.subscribe(
      params => (this.restaurantId = params.get('id')));
    // console.log('From review.component.ts, this is this.restaurantId: ', this.restaurantId);
    this.restaurantService.getRestaurant(this.restaurantId)
      .subscribe(restaurantReturned => {
        this.thisRestaurant = restaurantReturned;
    // console.log('From review.componenet.ts, this is this.thisRestaurant.data ', this.thisRestaurant.data);
    });
   }

  ngOnInit() {
  }
  // adding a review
onSubmit() {
  // console.log(Date.now(), 'from onSubmit, new.component.ts');
  const observable = this.restaurantService.addReview(this.restaurantId, this.newUser);
  observable.subscribe((data: any) => {
    console.log('From onSubmit, new.component.ts. After observable.subscribe, got data from post', data);
    if (data.error) {
      console.log(data.error);
      this.errors = data.error;
    } else {
    this.newUser = new User();
    this.router.navigate(['/restaurants/', this.restaurantId]);
   }
  });
}
  onCancel() {
    this.router.navigate(['/restaurants/', this.restaurantId]);
}



}
