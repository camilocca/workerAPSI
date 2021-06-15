import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
    private myBackurl= 'https://workerapiscamilo2021.azurewebsites.net/';
    private myAPIUrl= 'api/login/';
    public user_flag: boolean = false;

    user_login!: Login;

    public flag_login = true;
    public flag_signup = false;
    public flag_list = false;
    public flag_worker = false;

    constructor(private http: HttpClient) {}
  
    get_user(user: Login){
      return this.http.get(this.myBackurl + this.myAPIUrl + user.user)
    }

    save_user(user: Login): Observable<Login> {
      return this.http.post<Login>(this.myBackurl + this.myAPIUrl, user);
  }

  login_view(){
    this.flag_login = true;
    this.flag_signup = false;
    this.flag_list = false;
    this.flag_worker = false;

  }
  signup_view(){
    this.flag_login = false;
    this.flag_signup = true;
    this.flag_list = false;
    this.flag_worker = false;
    
  }   
  register_view(){
    this.flag_login = false;
    this.flag_signup = false;
    this.flag_list = true;
    this.flag_worker = true;
    
  }   

}
