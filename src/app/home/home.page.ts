import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public hasPermission: boolean;
  public token: string;

  constructor(private platform: Platform, private fcm: FCM) {
    this.setupFCM();
  }

  private async setupFCM() {
    console.log('FCM SETUP INIT');

    await this.platform.ready();
    console.log('PLATFORM READY');

    if (!this.platform.is('cordova')) {
      return;
    }
    console.log('IN CORDOVA');

    this.hasPermission = await this.fcm.requestPushPermission();
    console.log('CHECK hasPermission:', this.hasPermission);

    this.token = await this.fcm.getToken();
    console.log('CHECK getToken: ' + this.token);

    console.log('ON NOTIFICATION SUBSCRIBE');
    this.fcm.onTokenRefresh().subscribe((newToken) => console.log('NEW TOKEN:', newToken));

    this.fcm.onNotification().subscribe((payload: object) => console.log('ON NOTIFICATION:', payload));
  }

}
