import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {ContactsPage} from '../contacts/contacts'

/**
 * Generated class for the ContactCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-contact-create',
    templateUrl: 'contact-create.html',
})
export class ContactCreatePage {

    contact = {
        name: '',
        email: '',
        phone: '',
        cellphone_company_id: 1
    };

    cellphone_companies = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private http: HttpClient, private toastCtrl: ToastController) {
    }

    ionViewDidLoad() {
        this.http.get<Array<any>>('http://localhost:3000/cellphone_companies')
            .subscribe(data => {
                this.cellphone_companies = data
                console.log(this.cellphone_companies);
            });
    }

    create() {
        this.http.post('http://localhost:3000/contacts', this.contact)
            .subscribe(() => {
                let toast = this.toastCtrl.create({
                    message: 'Contato criado com sucesso',
                    duration: 3000
                });
                toast.present();
                this.navCtrl.push(ContactsPage)
            });
    }

}
