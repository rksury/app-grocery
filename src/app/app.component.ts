import {Component, QueryList, ViewChildren} from '@angular/core';
import {FCM} from '@ionic-native/fcm/ngx';
import {
    ActionSheetController,
    IonRouterOutlet,
    MenuController,
    ModalController, NavController,
    Platform,
    PopoverController,

} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    lastTimeBackPress = 0;
    timePeriodToExit = 2000;

    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public modalCtrl: ModalController,
        private menu: MenuController,
        private actionSheetCtrl: ActionSheetController,
        private popoverCtrl: PopoverController,
        private router: Router,
        public navCtrl: NavController,
        private fcm: FCM,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.backButtonEvent();
            this.fcm.getToken().then(token => {
                console.log(token);
            });

        });
    }

    backButtonEvent() {
        this.platform.backButton.subscribe(async () => {
            console.log('back button pressed');
            console.log(this.navCtrl);
            try {
                this.navCtrl.back();
            } catch (e) {

            }

            // close action sheet
            try {
                const element = await this.actionSheetCtrl.getTop();
                if (element) {
                    element.dismiss();
                    return;
                }
            } catch (error) {
            }

            // close popover
            try {
                const element = await this.popoverCtrl.getTop();
                if (element) {
                    element.dismiss();
                    return;
                }
            } catch (error) {
            }

            // close modal
            try {
                const element = await this.modalCtrl.getTop();
                if (element) {
                    element.dismiss();
                    return;
                }
            } catch (error) {
                console.log(error);

            }

            // close side menua
            try {
                const element = await this.menu.getOpen();
                if (element !== null) {
                    this.menu.close();
                    return;

                }

            } catch (error) {

            }

            this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
                if (outlet && outlet.canGoBack()) {
                    outlet.pop();

                } else if (this.router.url === '/home') {
                    if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                        // this.platform.exitApp(); // Exit from app
                        // navigator['app'].exitApp(); // work in ionic 4

                    } else {
                        // this.toast.show(
                        //     `Press back again to exit App.`,
                        //     '2000',
                        //     'center')
                        //     .subscribe(toast => {
                        //         console.log(JSON.stringify(toast));
                        // });
                        this.lastTimeBackPress = new Date().getTime();
                    }
                }
            });
        });
    }
}
