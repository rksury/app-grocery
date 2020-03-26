import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from './profile.service';
import {TabsPage} from '../tabs/tabs.page';
import {UtilsService} from "../utils.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    user = {
        id: 1,
        name: '',
        username: 'admin',
        mobile_number: '',
        address: null
    };

    constructor(private router: Router,
                private profileService: ProfileService,
                private tabpage: TabsPage,
                private utils: UtilsService) {
    }

    editprofile() {
        this.router.navigate(['tabs/editprofile']);
    }

    ngOnInit() {
        this.getUser();
    }

    getUser() {
        this.profileService.get_user().subscribe(data => {
                this.user = data;
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


}
