import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invaliduserAuth = new EventEmitter<boolean>(false)

  constructor(private http:HttpClient, private route:Router) { }


  userSignup(user:SignUp){

    this.http.post('http://localhost:3000/users', user, {observe:'response'})
    .subscribe((result)=>{
      console.log(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.route.navigate(['/'])
      }
      
    })

  }

  userAuthreload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/'])
    }
  }


  userLogin(data:login){

    this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response'  },
 
   ).subscribe((result:any)=>{

    if(result && result.body && result.body.length){
      this.invaliduserAuth.emit(false)
      
      localStorage.setItem('user', JSON.stringify(result.body))
      this.route.navigate(['/'])

    }else{
   
      this.invaliduserAuth.emit(true)
    }
   })
    

  }

}
