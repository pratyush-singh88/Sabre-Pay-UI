import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../classes/user';
import { Wallet } from '../classes/wallet';
import { Login } from '../classes/login';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class LoginService {
  url: string;
  token: string;
  header: any;

  constructor(private http: HttpClient) {
    this.url = "https://sabre-app-1.azurewebsites.net";
	  //this.url = "http://localhost:8080";
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
   }

   createUser(user:User): Observable<any> {
     console.log("Entry createUser method of Login service : "
      + user.email + " " + user.password + " " + user.faceID + " " + user.userRole + " " + user.walletID);
     console.log(JSON.stringify(user));
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
     return this.http.post<User[]>(this.url + '/api/registerUser/', user, httpOptions); 
   }

   getWalletId(): Observable<Object> {  
    return this.http.get(this.url + '/api/walletId');  
  } 

  private extractData(res: Response) {
    let body = res.json();
          return body;
      }
      private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
      }

      login(login:Login): Observable<Object> {  
        //debugger;  
        console.log("Entry login method of Login service : "
        + login.email );
       console.log(JSON.stringify(login));
       const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
       return this.http.post<Login[]>(this.url + '/api/login', login, httpOptions)  
      } 

      getBalanceForEmail(email:string): Observable<Object> {  
        return this.http.get(this.url + '/api/getUserBalance/' + email);  
      }

      getSabreReconcileBalance(email:string): Observable<Object> {
        return this.http.get(this.url + '/api/getReconReport/' + email);
      }

      getTransaction(): Observable<Object> {  
        return this.http.get(this.url + '/api/getTransactions');  
      }

      getSpecificTransaction(email:string): Observable<Object> {  
        return this.http.get(this.url + '/api/getSpecificTransactions/' + email);  
      }

}
