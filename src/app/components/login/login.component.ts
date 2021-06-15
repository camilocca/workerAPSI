import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/login';
import { TemplateService } from 'src/app/services/template.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  secretKey = "apis2021";
  form: FormGroup;
  user_login: Login | undefined;

  constructor(private fb : FormBuilder,
              private toastr: ToastrService,
              private _login_service: TemplateService) {

    this.form = this.fb.group({
      id:0,
      user:['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
      password:['', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]],
      mode:true
    })
  }

  ngOnInit(): void {
  }
  login(){
    const login: Login ={
      user: this.form.get('user')?.value,
      password: this.form.get('password')?.value,
      mode:true
    }
    console.log(login.user);

    this._login_service.get_user(login).subscribe(data =>{
        this.user_login = data as Login;
        if (this.decrypt(this.user_login.password) == login.password)
        {
            this.toastr.success('Bienvenido '+login.user, 'Inicio de sesion');
            this._login_service.register_view();
            this.form.reset();
        }else{
            this.toastr.error('Contraseña in valida','Error');
            console.log(this.user_login.password);
            console.log(login.password);
        }
    },error => {
      this.toastr.error('usuario no existe', 'Error');
      console.log(error);
    })
  } 

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8).toString();
  }

  register(){
    this._login_service.signup_view();
  }

}
