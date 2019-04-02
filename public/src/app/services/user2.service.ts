// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { of, Observable } from 'rxjs';

// import { User } from '../models';

// @Injectable({
//   providedIn: 'root'
// })
// export class User2Service {

//   constructor(private readonly http: HttpClient) { }

//   addUser(newUser: User): Observable<User> {
//     console.log('from addUser2 user.service.ts, newUser is', newUser);
//     console.log('from addUser2 user.service.ts, newUser.restaurant is', newUser.restaurant);
//     return this.http.post<User>('/urs', newUser, /*{ responseType: 'text'}*/);
//   }

//   getUsers() {
//     return this.http.get('/urs');
//   }

// }
