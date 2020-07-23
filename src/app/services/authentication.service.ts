import { Inject,Injectable } from '@angular/core';
import {BROWSER_STORAGE} from '../storage/storage';
import {User} from '../classes/user';
import {AuthResponse} from '../classes/authresponse';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(@Inject(BROWSER_STORAGE) private storage:Storage,private userService:UserService) { }
  public getToken():string{
  	return this.storage.getItem("login");
  }
  private saveToken(token:string):void{
  	this.storage.setItem('login',token); 
  }
  public login(user:User):Promise<any>{
  	return this.userService.login(user).then((authResp:AuthResponse)=>this.saveToken(authResp.token));
  }

  public register(user:User):Promise<any>{
  	return this.userService.register(user).then((authResp:AuthResponse)=>this.saveToken(authResp.token));
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
