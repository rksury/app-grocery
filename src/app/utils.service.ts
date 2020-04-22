import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(private toastController: ToastController) {
    }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 1000
        });
        toast.present();
    }
}
