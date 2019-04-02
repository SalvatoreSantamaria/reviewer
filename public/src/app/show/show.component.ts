import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RestaurantService } from '../services/rstrnt.service';
import { Restaurant } from '../models';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  @Input()
  reviews: any;
  result: any;
  rstrnt: any;
  id: any;
  reviewID: string;

  restaurant: Restaurant;
  constructor(
    private restaurantService: RestaurantService,
    private readonly route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => params.get('id')), //  converts param, takes id,
        switchMap(id => this.restaurantService.getRestaurant(id)) // point at restaurant service
      )
      .subscribe(restaurant => {
        this.rstrnt = restaurant; // then reassign to restaurant
        console.log('From showcomponent.ts, restaurant is ', this.rstrnt);
        this.reviewID = this.rstrnt.data._id;
        console.log(this.reviewID);
        const observable = this.restaurantService.getReviews(this.reviewID);
        observable.subscribe((data) => {
          console.log(data);
          this.result = data;
          this.reviews = this.result.data._user;
        });
    });
  }
}
