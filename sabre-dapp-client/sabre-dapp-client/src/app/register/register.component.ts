import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { FaceRecognitionService } from '../services/face-recognition.service';
import { AbstractCameraService } from '../services/abstract-camera.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../classes/user';
import { LoginService } from '../services/login.service';
import { TableComponent } from '../table/table.component';
import { ContentComponent } from '../content/content.component';
import { EthcontractService } from '../services/ethcontract.service';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpEventType } from '@angular/common/http';
import { Wallet } from '../classes/wallet';
import { environment } from '../../environments/environment';
import { NgProgressService } from 'ng2-progressbar';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data = false;
  message: string;
  imageString = '';
  faceApiResponse: Observable<FaceRecognitionResponse>;
  face: FaceRecognitionResponse;
  //subscriptionKey: string = 'b36a4edbc372433ea78d2786acb63dbe';
  //subscriptionKey: string = 'f19864adc9dc421b999b28f03212170b';
  subscriptionKey = environment.subscriptionKey;
  isButtonVisible = true;
  //userForm: any;
  statusCode: number;
  walletId: Wallet;
  camClicked = false;
  errors: any;
  progress: number = 0;

  userForm = new FormGroup({
    email : new FormControl(),
    password : new FormControl(),
    userRole : new FormControl(),
    faceID : new FormControl(),
    walletID : new FormControl()
  });

  constructor(private formbulider: FormBuilder,
    private faceRecognitionService: FaceRecognitionService,
    private cameraService: AbstractCameraService,
    private loginService:LoginService,
    private tableComponent:TableComponent,
    private ethcontractService: EthcontractService,
    private httpClient: HttpClient,
    private router: Router,
    private ngProgress: NgProgressService
  ) {
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.formbulider.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ],
      userRole: [''],
      faceID : [''],
      walletID: ['']
    });
  }

  ngOnInit() {
    
  }

  processImage() {
    if (!this.subscriptionKey) {
      return;
    }

    this.faceApiResponse = this.cameraService.getPhoto().pipe(
      switchMap(base64Image => {
        console.log("Inside getPhoto register page");
        this.isButtonVisible = false;
        this.imageString = base64Image;
        this.camClicked = true;
        return this.faceRecognitionService.scanImage(
          this.subscriptionKey,
          this.imageString
        );
      })
    );
  }


  onFormSubmit($event: any)    
  { 
    console.log("Entry onFormSubmit register component");
    //register using email, password, face
    if(this.camClicked) {
      this.ngProgress.start();
      this.subscribeFaceAPI();
      this.getWalletId();
      this.delay(5000).then(any=> {
            //if(this.camClicked) {
              console.log("Registering using face api");
              // if (JSON.stringify(this.face) === '') {
              //   this.errors = 'Please move your face in camera area';
              // }
              let faceRes = this.face[0];
              if (faceRes !== null || faceRes !== '') {
                console.log("Face ID: " + faceRes["faceId"]);  
                this.userForm.get('faceID').setValue(faceRes["faceId"]);
              }
            //}
            this.userForm.get('userRole').setValue('Individual');
            const user = this.userForm.value;
            this.creatUser(user);
            this.ngProgress.done();
      });
    }
    //register using email, password
    else {
      this.userForm.get('userRole').setValue('Individual');
      const user = this.userForm.value;
      this.creatUser(user);
    }
    console.log("Exit onFormSubmit register component");
  }

  getWalletId() {
    this.loginService.getWalletId()
    .subscribe((wallet: any) => {
          //console.log("wallet json : " + JSON.stringify(wallet));
          this.walletId = wallet;
          //console.log("wallet address: " + this.walletId.address); 
          if (this.walletId !== null) {
            console.log("Wallet address ID: " + this.walletId.address);
            this.userForm.get('walletID').setValue(this.walletId.address);
          }
    },
    errorCode =>  this.statusCode = errorCode);
  }

  subscribeFaceAPI() {
    console.log("Entry subscribeFaceAPI method onClick");
    this.faceRecognitionService.scanImage(
      this.subscriptionKey,
      this.imageString
      ).subscribe((faceResponse) => {
      console.log("Face recognition json : " + JSON.stringify(faceResponse));
      this.face = faceResponse;
      console.log("Face recognition json : " + JSON.stringify(this.face));
      //let faceRes = this.face[0];
      //console.log("Face ID: " + faceRes["faceId"]);   
      },
      errorCode =>  this.statusCode = errorCode);
      console.log("Exit subscribeFaceAPI method onClick");
  }

  
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }
  creatUser(user:User)    
  {    
    this.loginService.createUser(user).subscribe(    
    (event: HttpEvent<any>)=>    
    {  
      // switch (event.type) {
      //   case HttpEventType.Sent:
      //     console.log('Request has been made!');
      //     break;
      //   case HttpEventType.ResponseHeader:
      //     console.log('Response header has been received!');
      //     break;
      //   case HttpEventType.UploadProgress:
      //     this.progress = Math.round(event.loaded / event.total * 100);
      //     console.log(`Uploaded! ${this.progress}%`);
      //     break;
      //   case HttpEventType.Response:
      //     console.log('User successfully created!', event.body);
      //     setTimeout(() => {
      //       this.progress = 0;
      //     }, 1500);

      //    }  
      this.data = true;    
      this.message = 'Data saved Successfully';    
      this.userForm.reset();
      this.router.navigate(['/Dashboard']);    
    }, (error) => {
      console.log("Errors : " + JSON.stringify(error));
      console.log("Errors:Error : " + JSON.stringify(error.error));
      this.errors = error.error.message;
    });    
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log("body " + body);
  }
      private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
      }

  reset() {
    this.errors = '';
    this.faceApiResponse = null;
    this.imageString = '';
    this.isButtonVisible = true;
    this.userForm.reset();
    this.router.navigate(['/register']);
  }

}
