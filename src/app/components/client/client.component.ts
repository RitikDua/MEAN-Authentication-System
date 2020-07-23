import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import  {Router} from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
	name:String="";
	email:String="";
	exist:boolean=false;
  constructor(private userService:UserService,private router:Router,) {
  	const {email,name}=this.userService.getCurrentUser();
  	 this.email=email;
  	 this.name=name;
  	if(this.email.length>0 && this.name.length>0)
  		this.exist=true;
  	}

  logout(){

    let start=async()=>{this.userService.logout()}
    start().then(()=>this.router.navigateByUrl("/login"));
  }
  ngOnInit(): void {
  }

}
