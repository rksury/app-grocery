import { Component } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
   // CDRS = { name: string; id: number; value: boolean }

 constructor(fb: FormBuilder) {
    // this.CDRS = [
    //   {
    //     id : 1,
    //     name : 'value 1',
    //     value : true,
    //   },
    //     ];
  }

  // zone = {
  //   kind: 'user'
  // };
  // modeKeys = [
  //   'key1',
  //   'key2',
  //   'key3',
  //   'key4',
  // ];

}
