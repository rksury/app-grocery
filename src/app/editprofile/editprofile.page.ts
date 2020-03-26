import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../profile/profile.service';
import {TabsPage} from '../tabs/tabs.page';
import {UtilsService} from '../utils.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-editprofile',
    templateUrl: './editprofile.page.html',
    styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
    user = {
        id: '',
        name: '',
        username: '',
        mobile_number: '',
        address: null
    };
    updateForm = new FormGroup({
        name: new FormControl(this.user.name),
        username: new FormControl(this.user.username),
        mobile_number: new FormControl(this.user.mobile_number),
        address: new FormControl(this.user.address)
    });


    constructor(private profileService: ProfileService,
                private tabpage: TabsPage,
                private utils: UtilsService,
                private router: Router) {
    }

    ngOnInit() {
        this.get_profile();
    }

    get_profile() {
        this.profileService.get_user().subscribe(data => {
                this.user = data;
                this.updateForm.setValue({
                    name: this.user.name,
                    username: this.user.username,
                    mobile_number: this.user.mobile_number,
                    address: this.user.address
                });
            },
            error => {
                if (error.status === 401) {
                    this.tabpage.logout();
                    this.router.navigate(['tabs/login']);
                } else {
                    this.utils.presentToast('Some error occured');
                }
            });
    }

    update_profile() {
        console.log(this.updateForm.value);
    }


}
