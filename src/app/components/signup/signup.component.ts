import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/login';
import { TemplateService } from 'src/app/services/template.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  secretKey = "apis2021";
  form: FormGroup;
  user_login: Login | undefined;
  token: string = 'apis2021'

  constructor(private fb : FormBuilder,
              private toastr: ToastrService,
              private _login_service: TemplateService) {

    this.form = this.fb.group({
      id:0,
      user:['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
      password:['', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]],
      password_again:['', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]],
      token:['', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]],
      mode:true
    })
  }
  ngOnInit(): void {
  }

  signup(){
    if (this.form.get('password')?.value == this.form.get('password_again')?.value)
    {
      if (this.token == this.form.get('token')?.value ) 
      {
        const login: Login ={
          user: this.form.get('user')?.value,
          password: this.encrypt(this.form.get('password')?.value),
          mode: true,
        }
        this._login_service.save_user(login).subscribe(data =>{
            console.log(data);
            this.toastr.success('El usuario '+login['user']+' fue registrado exitosamente', 'Usuario Registrado');
            this._login_service.login_view();
            this.form.reset();
        },error => {
          this.toastr.error('Usuario no guardado', 'Error del Servidor');
          console.log(error);
        })
      }else{
        this.toastr.error('El token es invalido', 'Error');
      }

    }else{
      this.toastr.error('las contraseñas son diferentes', 'Error');
    }
  }

  encrypt(value : string) : string{
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }
  login_view() {
    this._login_service.login_view();
  }
  


  

}
