import { Component, OnInit } from '@angular/core';
import  {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	public formError:string='';
	public credentials={
		name:'',email:'',password:''
	};

  constructor(private router:Router,private authenticationService:UserService) { }

  ngOnInit(): void {
  }

  errorMsg():boolean{
    console.log(this.formError);
    if(this.formError.length !== 0) return true;
    else return false;
  }
  public onRegisterSubmit():void{
  	this.formError="";
  	if(!this.credentials.name||!this.credentials.email||!this.credentials.password)
  			this.formError="All fields are Required";
  	else this.doRegister();
  }
  private doRegister():void{
  	this.authenticationService.register(this.credentials)
  		.then(()=> this.router.navigateByUrl("/profile"))
  		.catch((msg)=>this.formError=msg);
  }
}
