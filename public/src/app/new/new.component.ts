import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamMap } from '@angular/router';
import { RestaurantService } from '../services/rstrnt.service';
import { Restaurant } from '../models';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})

export class NewComponent implements OnInit {
  // newRestaurant: any;
  errors: string[] = [];
  newRestaurant: Restaurant = new Restaurant();
  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    // console.log(Date.now(), 'from onSubmit, new.component.ts');
    const observable = this.restaurantService.addRestaurant(this.newRestaurant);
    observable.subscribe((data: any) => {
      // console.log('From onSubmit, new.component.ts. After observable.subscribe, got data from post', data);
      if (data.error) {
        console.log(data.error);
        this.errors = data.error;
      } else {
        this.newRestaurant = new Restaurant();
        this.router.navigate(['/restaurants']);
      }
    });
  }
}

