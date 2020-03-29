import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../profile/profile.service';
import {TabsPage} from '../tabs/tabs.page';
import {UtilsService} from '../utils.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {EditProfileService} from "./edit-profile.service";

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
        email: '',
        address: null
    };
    updateForm = new FormGroup({
        name: new FormControl(this.user.name),
        email: new FormControl(this.user.email),
        mobile_number: new FormControl(this.user.mobile_number),
        address: new FormControl(this.user.address)
    });


    constructor(private profileService: ProfileService,
                private tabpage: TabsPage,
                private utils: UtilsService,
                private router: Router,
                private updateService: EditProfileService) {
    }

    ngOnInit() {
        this.get_profile();
    }

    ionViewWillEnter() {
        this.get_profile();
    }

    get_profile() {
        this.profileService.get_user().subscribe(data => {
                this.user = data;
                this.updateForm.setValue({
                    name: this.user.name,
                    email: this.user.email,
                    mobile_number: this.user.mobile_number,
                    address: this.user.address
                });
            },
            error => {
                if (error.status === 401) {
                    this.tabpage.logout();
                    this.router.navigate(['tabs/login']);
                } else {
                    try {
                        this.utils.presentToast(error.error.error[0]);
                    } catch (e) {
                        this.utils.presentToast('Some Error Occurred');

                    }
                }
            });
    }

    update_profile() {
        this.updateService.update_user(this.updateForm.value).subscribe(data => {
            this.utils.presentToast('User Updated');
            this.router.navigate(['/tabs/profile']);
        }, error => {
            try {
                this.utils.presentToast(error.error.error[0]);
            } catch (e) {
                this.utils.presentToast('Some Error Occurred');

            }
        });
    }


}
