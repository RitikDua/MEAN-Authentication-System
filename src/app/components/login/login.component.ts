import { Component, OnInit } from '@angular/core';
import  {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formError:string='';
  public credentials={
  	name:'',
  	email:'',
  	password:''
  }
  constructor(private router:Router,private authenticationService:UserService) { }

  ngOnInit(): void {
  }
  errorMsg():boolean{
    if(this.formError.length !== 0) return true;
    else return false;
  }
  public onLoginSubmit():void{
  	this.formError="";
  	if(!this.credentials.email||!this.credentials.password)
  		this.formError="All fields are Required";
  	else this.doLogin();
  }
  private doLogin():void{
  	this.authenticationService.login(this.credentials)
  		.then(()=> this.authenticationService.isLoggedIn()&&this.router.navigateByUrl('/profile'))
  		.catch((msg)=>{
  			this.formError=msg
  		});
  }
}
