import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  email: string = '';
  password: string = '';

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(private auth: AuthService) {}

  //registration click button function

  signup() {
    if (this.email == '') {
      alert('plese enter the email');
      return;
    }
    if (this.password == '') {
      alert('plese enter the password');
      return;
    }

    this.auth.registration(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  //Google SignUp Button Click Function

  SignUpWithGoogle() {
    this.auth.googleSignIn();
  }
}
