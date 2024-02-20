import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  userEmail: string = '';
  tasks?: any[];

  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private platformlocation: PlatformLocation
  ) {
    history.pushState(null, '', location.href);
    this.platformlocation.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  ngOnInit(): void {
    this.userEmail = this.auth.getUserEmail();
    console.log(this.userEmail);

    //getting data from firebase

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.firestore
          .collection('/Students', (ref) =>
            ref.where('emailId', '==', user.email)
          )
          .valueChanges()
          .subscribe((tasks) => {
            this.tasks = tasks;
          });
      }
    });
  }

  //lLogOut Click
  logout() {
    this.auth.logout();
  }
}
