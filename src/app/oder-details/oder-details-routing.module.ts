import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OderDetailsPage } from './oder-details.page';

const routes: Routes = [
  {
    path: '',
    component: OderDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OderDetailsPageRoutingModule {}
