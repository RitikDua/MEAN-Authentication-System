import { Injectable } from '@angular/core';
// import {USER} from '../interfaces/user';

import {AuthResponse} from '../classes/authresponse';
import {User} from '../classes/user';
import  {HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject} from '@angular/core';
import {BROWSER_STORAGE} from '../storage/storage';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	
	username:string;
	apiBaseUrl="http://localhost:3000";
	
	constructor(@Inject(BROWSER_STORAGE) private storage:Storage,private http:HttpClient,private router:Router) { 
		if(this.isLoggedIn())
		{
			console.log("isLoggedIn")
		}
		else{
			this.router.navigateByUrl("/login");
		}
	}

	private makeAuthApiCall(urlPath:string,user:User):Promise<AuthResponse>{
		const url:string=`${this.apiBaseUrl}/${urlPath}`;
		return this.http.post(url,user).toPromise().then((res)=>res as AuthResponse).catch((err)=> err);
	}
	


  private getToken():string{
  	return this.storage.getItem("login");
  	}
  private saveToken(token:string):void{
  	this.storage.setItem('login',token); 
  }
   public login(user:User):Promise<any>{
  	return this.makeAuthApiCall("login",user).then((authResp:AuthResponse)=>this.saveToken(authResp.token));
  }

  public register(user:User):Promise<any>{
  	return this.makeAuthApiCall("signup",user).then((authResp:AuthResponse)=>this.saveToken(authResp.token));
  }
  public logout():void{
  	this.storage.removeItem("login");
  }
  public isLoggedIn():boolean{
  	const token:string=this.getToken();
  	if(token){
  		const payload=JSON.parse(atob(token.split('.')[1]));
  		return payload.exp>(Date.now()/1000);
  	}
  	else{
  		return false;
  	}
  }
  public getCurrentUser():User{
  	if(this.isLoggedIn()){
  		const token:string=this.getToken();
  		const {email,name}=JSON.parse(atob(token.split('.')[1]));
  		return {email,name} as User;
  	}
  }
}		