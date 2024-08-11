import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AppState } from '../../../state/app.state';
import { selectUserDetails } from '../../../state/login/login.selectors';
import {DetailedUserInfo} from '../../signup/detailed-user-info.model'

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.css'
})
export class SuccessModalComponent implements OnInit{
  userDetails$:Observable<
  {
    basic_user_info?: {email?: string, phone_number? : string, user_name: string},
    detailed_user_info? :DetailedUserInfo
  }
  > = this.store.select(selectUserDetails)

  constructor(
    private store: Store<AppState>
  ){

  }

  ngOnInit():void{
    this.userDetails$.pipe(take(1)).subscribe(user_info => {
      console.log("modal got the info", user_info)
    })
  }
}
