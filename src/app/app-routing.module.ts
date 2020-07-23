import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {ClientComponent} from './components/client/client.component';

const routes: Routes = [
	{path:"",redirectTo:"/login",pathMatch:'full'},
		{path:'signup',component:SignupComponent},
	{path:'login',component:LoginComponent}
	,{path:'profile',component:ClientComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
