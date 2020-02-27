import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-merchant',
  templateUrl: './admin-merchant.component.html',
  styleUrls: ['./admin-merchant.component.css']
})
export class AdminMerchantComponent implements OnInit {

  balance: number;
  email: string;
  sb: number;
  mmtb: number;
  uberb: number;
  mrtb: number;
  delb:number;
  merchant = false;
  sabre = false;

  constructor(private activatedRoute: ActivatedRoute,
  private router : Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.balance = JSON.parse(params.get('balance'));
      this.email = params.get('email');
      //console.log(this.balance);
      if (this.balance !== null || this.email !== null) {
        this.merchant = true;
      }
      this.sb = JSON.parse(params.get('sb'));
      this.mmtb = JSON.parse(params.get('mmtb'));
      this.uberb = JSON.parse(params.get('uberb'));
      this.mrtb = JSON.parse(params.get('mrtb'));
      this.delb = JSON.parse(params.get('delb'));

      if (this.sb !== null || this.mmtb !== null || this.uberb !== null  || this.mrtb !== null  
        || this.delb !== null  ) {
          this.sabre = true;
          this.email = 'admin';
      }
    });
  }

  reconcileReport () {
    this.router.navigate(['/report', this.email]);
  }

}
