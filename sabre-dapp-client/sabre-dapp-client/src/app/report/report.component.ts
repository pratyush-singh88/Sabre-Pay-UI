import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  transaction: any;
  statusCode: number;
  balanceDisplay = false;
  email: string;

  constructor(private activatedRoute : ActivatedRoute, private loginService: LoginService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.email = params.get('email');
    });

    if (this.email === 'admin') {
      this.getBalanceAndReport();
    }
    else {
      this.getSpecificTransaction();
    }
  }

  getBalanceAndReport() {
    console.log("Entry reconcile report");
    this.loginService.getTransaction()
    .subscribe((tran: any) => {
      console.log(JSON.stringify(tran));
          this.transaction = tran;
          this.balanceDisplay = true;
    },
    errorCode =>  this.statusCode = errorCode);
  }


  getSpecificTransaction() {
    this.loginService.getSpecificTransaction(this.email)
    .subscribe((tran: any) => {
      console.log(JSON.stringify(tran));
          this.transaction = tran;
          this.balanceDisplay = true;
    },
    errorCode =>  this.statusCode = errorCode);
  }

}
