import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RestaurantService } from '../services/rstrnt.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants: {};
  data: {};

  constructor(
    // private _httpService: HttpService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRestaurantsFromService();
  }

  getRestaurantsFromService() {
    const observable = this.restaurantService.getRestaurants();
    observable.subscribe(data => {
      // console.log('Got all data', data);
      this.restaurants = data;
    });
  }

  delete(id) {
    this.restaurantService.removeRestaurant(id).subscribe(result => {
      console.log('this is the removeRestaurant(id) route, id is', id);
      this.ngOnInit();
      this.router.navigate(['/restaurants']);
    });
  }



}
