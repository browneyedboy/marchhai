import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListPage } from '../pages/lists/lists';
import { PlayerPage } from '../pages/player/player';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ChangepassPage } from "../pages/changepass/changepass";
import { HelpPage } from "../pages/help/help";
import { WelcometabPage } from "../pages/welcometab/welcometab";
import { DemoPage } from "../pages/demo/demo";
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ListPage,
    PlayerPage,
    LoginPage,
    RegisterPage,
    ChangepassPage,
    HelpPage,
    WelcometabPage,
    DemoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ListPage,
    PlayerPage,
    LoginPage,
    RegisterPage,
    ChangepassPage,
    HelpPage,
    WelcometabPage,
    DemoPage
  ],
  providers: []
})
export class AppModule {}
