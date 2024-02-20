import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(private auth: AuthService) {}

  //Login click button function

  signin() {
    if (this.email == '') {
      alert('plese enter the email');
      return;
    }
    if (this.password == '') {
      alert('plese enter the password');
      return;
    }

    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  //Google SignIn Click button Function

  SignInWithGoogle() {
    this.auth.googleSignIn()
  }
}
