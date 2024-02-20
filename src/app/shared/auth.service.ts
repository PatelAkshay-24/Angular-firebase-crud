import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Route, Router } from '@angular/router';
import { AppStrings } from './helper/app-strings';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  //login services
  private userEmailKey = 'userEmail';

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem(AppStrings.TOKEN_KEY, AppStrings.TRUE_VALUE);
        // localStorage.setItem(this.userEmailKey, email);

        if (res.user?.emailVerified == true) {
          // this.router.navigate([AppStrings.DASHBOARD_ROUTE]);
          if (email == 'patelakshay2024a@gmail.com') {
            this.router.navigate([AppStrings.DASHBOARD_ROUTE]);
            localStorage.setItem(AppStrings.TOKEN_KEY, AppStrings.TRUE_VALUE);
            localStorage.setItem(this.userEmailKey, email);
            this.isAuthenticated = true;
          } else {
            this.router.navigate([AppStrings.USERDASHBOARD_ROUTE]);
            localStorage.setItem(this.userEmailKey, email);
            localStorage.setItem(AppStrings.TOKEN_KEY, AppStrings.TRUE_VALUE);
            this.isAuthenticated = true;
          }
        } else {
          alert('please verify your mail ');
          this.router.navigate([AppStrings.LOGIN_ROUTE]);
        }
      },
      (err) => {
        alert(err.message);
        this.router.navigate([AppStrings.LOGIN_ROUTE]);
      }
    );
  }

  //Registration Services

  registration(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        this.router.navigate([AppStrings.LOGIN_ROUTE]);
        alert([AppStrings.REGISTRATION_SUCCESSFUL]);
        this.SendVerficationEmail(res.user);
      },
      (err) => {
        alert(err.message);
        this.router.navigate([AppStrings.REGISTER_ROUTE]);
      }
    );
  }

  //Logout Services

  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem(AppStrings.TOKEN_KEY);
        localStorage.removeItem('userEmail');
        this.router.navigate([AppStrings.LOGIN_ROUTE]);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  //Forgot Password Services

  forgotpassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate([AppStrings.VERIFICATON_ROUTE]);
      },
      (err) => {
        alert(AppStrings.SOMETHING_WENT_WRONG_MESSAGE);
      }
    );
  }

  //Email Verification Services

  SendVerficationEmail(user: any) {
    this.fireauth.currentUser
      .then((u) => u?.sendEmailVerification())
      .then(
        (res: any) => {
          alert('first check your mail');
        },
        (err: any) => {
          alert(
            'Something Went Wrong. Not able to send mail to registered Email.'
          );
        }
      );
  }

  //Google SignIn Services

  googleSignIn() {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({ prompt: 'select_account' });
    return this.fireauth.signInWithPopup(provider).then(
      (res) => {
        const userEmail = res.user?.email; // Access the user's email
        if (userEmail) {
          localStorage.setItem(this.userEmailKey, userEmail);
          if (userEmail == 'patelakshay2024a@gmail.com') {
            this.router.navigate([AppStrings.DASHBOARD_ROUTE]);
            localStorage.setItem(AppStrings.TOKEN_KEY, AppStrings.TRUE_VALUE);
            localStorage.setItem(this.userEmailKey, userEmail);
            this.isAuthenticated = true;
          } else {
            this.router.navigate([AppStrings.USERDASHBOARD_ROUTE]);
            localStorage.setItem(this.userEmailKey, userEmail);
            localStorage.setItem(AppStrings.TOKEN_KEY, AppStrings.TRUE_VALUE);
            this.isAuthenticated = true;
          }
        }
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  //Email Showing Services
  getUserEmail(): string {
    return localStorage.getItem(this.userEmailKey) || ''; // Retrieve user's email from localStorage
  }

  //Aurth Guard Services
  private isAuthenticated = false;

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
