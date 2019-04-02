import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import { Restaurant } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) {
  }

  addRestaurant(newRestaurant) {
    console.log('from addRestaurant restaurant.service.ts newRestaurant is', newRestaurant);
    return this._http.post('/rts', newRestaurant);
  }

  getRestaurant(id: string): Observable<Restaurant> {

    // return this._http.get('/rts/' + id);
    return this._http.get<Restaurant>('/rts/' + id);
  }

  getRestaurants() {
    // console.log('from getRestaurants()');
    return this._http.get('/rts');
  }

  updateRestaurant(id, restaurantData): Observable<Restaurant> {
    console.log('from updateRestaurant() in restaurant.service.ts, restaurantData is ', restaurantData);
    return this._http.put<Restaurant>('/rts/' + id, restaurantData);
  }

  removeRestaurant(id): Observable<Restaurant> {
    return this._http.delete<Restaurant>('/rts/' + id);
  }

// for adding a review
  addReview(id, review): Observable<Restaurant> {
    console.log('From rstrnt.service.ts review and id are', review, id);
    return this._http.post<Restaurant>('/rtsReview/' + id, review);
  }
// wrong
// for getting a restaurants reviews
  getReviews(id: string): Observable<Restaurant> {
    return this._http.get<Restaurant>('/rtsReview/' + id);
}

}

