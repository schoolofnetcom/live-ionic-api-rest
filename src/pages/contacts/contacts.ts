import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';

/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-contacts',
    templateUrl: 'contacts.html',
})
export class ContactsPage {

    contacts = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams, private http: HttpClient) {
    }

    ionViewDidLoad() {
        //#TypeScript - generics
        this.http.get<Array<any>>('http://localhost:3000/contacts')
            .subscribe(data => this.contacts = data);
        //console.log('bbbbbbbbbb');
    }

}