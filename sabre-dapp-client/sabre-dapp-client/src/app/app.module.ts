import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BoolToYesNoPipe } from './pipes/bool-to-yes-no/bool-to-yes-no.pipe';
import {
  AbstractCameraService,
  cameraFactory
} from './services/abstract-camera.service';
import { DesktopCameraService } from './services/desktop-camera.service';
import { FaceRecognitionService } from './services/face-recognition.service';
import { MobileCameraService } from './services/mobile-camera.service';
import { PlatformInformationProvider } from './services/platform-information.provider';
import { TableComponent } from './table/table.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginService } from './services/login.service';
import { EthcontractService } from './services/ethcontract.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminMerchantComponent } from './admin-merchant/admin-merchant.component';
import { ReportComponent } from './report/report.component';
import { NgProgressModule } from 'ng2-progressbar';


const appRoutes: Routes = [
  // {
  //   path: '',
  //   component: ContentComponent,
  //   data: {
  //     title: 'Login page',
  //   }
  // },
  {
    path: '',
    component: RegisterComponent,
    data: {
      title: 'Registration page',
    }
  },
  {
     path: 'login',
     component: ContentComponent,
     data: {
     title: 'Login page',
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Registration page',
    }
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    data: {
      title: 'Home page',
    }
  },
  {
    path: 'admin-merchant/:balance/:email',
    component: AdminMerchantComponent,
    data: {
      title: 'AdminMerchant page'
    }
  }, 
  {
    path: 'admin-merchant/:sb/:mmtb/:uberb/:mrtb/:delb',
    component: AdminMerchantComponent,
    data: {
      title: 'AdminMerchant page'
    }
  },
  {
    path: 'report/:email',
    component: ReportComponent,
    data: {
      title: 'Report page'
    }
  }
]; 

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ContentComponent,
    BoolToYesNoPipe,
    TableComponent,
    RegisterComponent,
    DashboardComponent,
    AdminMerchantComponent,
    ReportComponent
  ],
  imports: [FormsModule, ReactiveFormsModule, BrowserModule, NgProgressModule,
    HttpClientModule, RouterModule.forRoot(appRoutes)],
  providers: [
    DesktopCameraService,
    MobileCameraService,
    FaceRecognitionService,
    LoginService,
    TableComponent,
    EthcontractService,
    PlatformInformationProvider,
    {
      provide: AbstractCameraService,
      useFactory: cameraFactory,
      deps: [PlatformInformationProvider]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
