import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {ContactsPage} from "../contacts/contacts";

/**
 * Generated class for the ContactEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-edit',
  templateUrl: 'contact-edit.html',
})
export class ContactEditPage {

    contact = {
        id: 0,
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
        const id = this.navParams.get('id');
        this.http.get<any>(`http://localhost:3000/contacts/${id}`)
            .subscribe(data => {
                this.contact = data
            });
        this.http.get<Array<any>>('http://localhost:3000/cellphone_companies')
            .subscribe(data => {
                this.cellphone_companies = data
                console.log(this.cellphone_companies);
            });
    }

    update() {
        this.http.put(`http://localhost:3000/contacts/${this.contact.id}`, this.contact)
            .subscribe(() => {
                let toast = this.toastCtrl.create({
                    message: 'Contato atualizado com sucesso',
                    duration: 3000
                });
                toast.present();
                this.navCtrl.push(ContactsPage)
            });
    }

}
