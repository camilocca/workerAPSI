import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WorkerApsi } from 'src/app/models/worker_apis';
import { TemplateService } from 'src/app/services/template.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit, OnDestroy {

  list_workers : any;
  subscribtion!: Subscription;
  form: FormGroup;
  tittle_name: string ='';
  button_name: string ='';
  worker!: WorkerApsi;
  worker_id: any = null;



  
  constructor(private fb : FormBuilder, 
              private toastr: ToastrService,
              private _worker_service: WorkerService,
              private _login_service: TemplateService){

    this.form = this.fb.group({
      id:0,
      name:['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
      lastName:['', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]],
      docId:['', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]],
      job:['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]]

    })
  }

  ngOnInit(): void {
    this.subscribtion = this._worker_service.get_worker$().subscribe(data => {
      console.log(data);
      this.worker = data;
      this.worker_id = this.worker.id;
      this.change_mode()
      this.form.patchValue({
        name: this.worker.name,
        lastName: this.worker.lastName,
        docId: this.worker.docId,
        job: this.worker.job,
      })
    });
  }
  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }

  change_mode(){
    if(this.worker_id != null) 
    {
      this.tittle_name ='editar';
      this.button_name = 'Editar'
    }
    else 
    {
      this.tittle_name ='agregar';
      this.button_name = 'Guardar'
    }
  }

  add_worker(){
    console.log('valor de id: ' + this.worker_id);
    if(this.worker_id == null){ 
      this.add();
    }else{ 
      this.edit();
    }
  }
  add(){
    const worker: WorkerApsi ={
      name: this.form.get('name')?.value,
      lastName: this.form.get('lastName')?.value,
      docId: this.form.get('docId')?.value,
      job: this.form.get('job')?.value,
    }
    this._worker_service.save_worker(worker).subscribe(data =>{
        console.log(data);
        this.toastr.success('El empleado '+worker['name']+' fue registrado exitosamente', 'Empleado Registrado');
        this._worker_service.get_worker();
        this.form.reset();
    },error => {
      this.toastr.error('Empleado no guardado', 'Error del Servidor');
      console.log(error);
    })
  } 

  edit(){
    const worker: WorkerApsi ={
      id: this.worker.id,
      name: this.form.get('name')?.value,
      lastName: this.form.get('lastName')?.value,
      docId: this.form.get('docId')?.value,
      job: this.form.get('job')?.value,
    }

    this._worker_service.update_worker_end(this.worker_id,worker).subscribe(data =>{
      console.log(data);
      this.toastr.info('El empleado '+worker['name']+' fue editado exitosamente', 'Empleado Registrado');
      this._worker_service.get_worker();
      this.form.reset();
      this.worker_id = null;
      this.change_mode();

    },error => {
      this.toastr.error('Empleado no editado', 'Error del Servidor');
      console.log(error);
      this.form.reset();
      this.worker_id = null;
      this.change_mode();
      
    })
  }
  login_view() {
    this._login_service.login_view();
  }
}
