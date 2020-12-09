import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderService } from 'src/orders.service';
import { Orders } from '../order'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'paf2-orders-fe';
  
  constructor(private orderSvc: OrderService){}
  ngOnInit():void {}
  search: string = ''
  errorMsg: string = ''
  error: boolean = false
  orderResult : Orders
  notifier = new Subject()
  getOrder(){
    console.log('hi')
    console.log(this.search)
    this.orderSvc.getAnOrder(parseInt(this.search))
      .pipe(takeUntil(this.notifier))
      .subscribe(
        res =>{
            this.orderResult = res[0]
            this.errorMsg = ''          
        },
        err=> {
          this.orderResult = undefined
          this.errorMsg = err
        }
      )
      
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.notifier.next()
    this.notifier.complete()
  }
}
