import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantsComponent } from './restaurants/restaurants.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/restaurants' },
  {
    path: 'restaurants',
    children: [
      { path: '', component: RestaurantsComponent },
      { path: 'new', component: NewComponent },
      { path: ':id', component: ShowComponent },
      { path: ':id/edit', component: EditComponent },
      { path: ':id/review', component: ReviewComponent },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
