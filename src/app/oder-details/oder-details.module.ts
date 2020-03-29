import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OderDetailsPageRoutingModule } from './oder-details-routing.module';

import { OderDetailsPage } from './oder-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OderDetailsPageRoutingModule
  ],
  declarations: [OderDetailsPage]
})
export class OderDetailsPageModule {}
