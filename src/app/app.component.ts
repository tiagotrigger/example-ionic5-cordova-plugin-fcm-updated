import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';

import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public hasPermission;
  public token;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
  ) {
    this.initializeApp();
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setupFCM();
    });
  }

  private async setupFCM() {
    console.log('FCM SETUP INIT');
    if (!this.platform.is('cordova')) {
      return false;
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
