import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AppStrings } from './shared/helper/app-strings';
import { EmailVerificationComponent } from './component/email-verification/email-verification.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
   
  },
  {
    path: 'EmailVerification',
    component: EmailVerificationComponent,
    
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    
  },
  { path: 'userdashboard', component: UserDashboardComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
