import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { FaceRecognitionService } from '../services/face-recognition.service';
import { AbstractCameraService } from '../services/abstract-camera.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Login } from '../classes/login';
import { ConfirmLoginStatus } from '../classes/ConfirmLoginStatus'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  data = false;
  message: string;
  imageString = '';
  faceApiResponse: Observable<FaceRecognitionResponse>;
  //subscriptionKey: string = 'b36a4edbc372433ea78d2786acb63dbe';
  //subscriptionKey: string = 'f19864adc9dc421b999b28f03212170b';
  subscriptionKey = environment.subscriptionKey;
  isButtonVisible = true;
  model : any={};
  errorMessage:string;
  errors: any;
  loginRes: ConfirmLoginStatus;
  bal: number;
  statusCode: number;
  sb: number;
  mmtb: number;
  uberb: number;
  mrtb: number;
  delb:number;


  userForm = new FormGroup({
    email : new FormControl(),
    password : new FormControl(),
  });

  constructor(private formbulider: FormBuilder,
    private faceRecognitionService: FaceRecognitionService,
    private cameraService: AbstractCameraService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.formbulider.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ],
    });
  }


  onFormSubmit($event: any)    
  { 
    console.log("Entry onFormSubmit login component");
    if (this.userForm.invalid) {
      return;
    }
    else {
      //login using email and password
      const loginForm = this.userForm.value;
      this.loginUser(loginForm);
    }
  }
  
  loginUser(login:Login)    
  {    
    this.loginService.login(login).subscribe(    
    (logRes: any)=>    
    {    
      console.log("Login Response : " + JSON.stringify(logRes));
      this.loginRes = logRes;
      console.log("User role : " + this.loginRes.userRole);
      if (this.loginRes.userRole == 'Individual') {
        this.errors = "Only Sabre/Merchant's are allowed to access this feature"; 
        return;
      }
      if (this.loginRes.userRole == 'Admin') {

        console.log("Email : " + this.userForm.get('email').value);
        this.getSabreReconcileBalanceUsingEmail(this.userForm.get('email').value);

        this.data = true;    
        this.message = 'Admin logged-in Successfully';    
        console.log(this.message);
        //this.userForm.reset();
        //this.router.navigate(['/admin-merchant', this.bal]);
      }
      else if (this.loginRes.userRole == 'Company') {
        console.log("Email : " + this.userForm.get('email').value);
        this.getBalanceUsingEmail(this.userForm.get('email').value);

        this.data = true;    
        this.message = 'Company logged-in Successfully';    
        console.log(this.message);
      }
      else {
        this.errors = "Not able to login. Please check the login details";
      }
      
    },
    (error) => {
      console.log("Errors:Error : " + JSON.stringify(error.error));
      this.errors = error.error.message;    
    });    
  }


  getBalanceUsingEmail(email:string) {
    this.loginService.getBalanceForEmail(email)
    .subscribe((b: any) => {
         console.log("Balance for user : " + JSON.stringify(b));
          this.bal = b.balance;
         //console.log("Balance for user : " + this.bal);
         this.router.navigate(['/admin-merchant', this.bal, email]);
    },
    errorCode =>  this.statusCode = errorCode);
  }


  getSabreReconcileBalanceUsingEmail(email:string) {
    this.loginService.getSabreReconcileBalance(email)
    .subscribe((b: any) => {
         console.log("Sabre reconcile bal : " + JSON.stringify(b));
         if (b.sabreBalance !== null) {
          this.sb = b.sabreBalance;
         }
         else {
          this.sb = -1;
         }
         if (b.makeMyTripBalance !== null) {
          this.mmtb = b.makeMyTripBalance;
         }
         else {
          this.mmtb = -1;
         }
         if (b.uberBalance !== null) {
          this.uberb = b.uberBalance;
         }
         else {
          this.uberb = -1;
         }
         if (b.marriotBalance !== null) {
          this.mrtb = b.marriotBalance;
         }
         else {
          this.mrtb = -1;
         }
         if (b.deltaBalance !== null) {
          this.delb = b.deltaBalance;
         }
         else {
          this.delb = -1;
         }
         this.router.navigate(['/admin-merchant', this.sb, this.mmtb, this.uberb, this.mrtb, this.delb]);
    },
    errorCode =>  this.statusCode = errorCode);
  }

}
