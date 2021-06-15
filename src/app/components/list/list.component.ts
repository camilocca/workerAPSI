import { ElementRef, OnChanges, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WorkerApsi } from 'src/app/models/worker_apis';
import { TemplateService } from 'src/app/services/template.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  form: FormGroup;
  text: string ='';
  flag_form: string = 'ocultar';
  
  @ViewChild('bindingInput') bindingInput!: ElementRef;

  constructor(public _worker_service: WorkerService,
              public toastr: ToastrService,
              private fb : FormBuilder,
              private _login_service: TemplateService) { 

                this.form = this.fb.group({
                  text:['',[Validators.minLength(1)]]
                })
  }
  


  ngOnInit(): void {
    this._worker_service.get_worker();
  }

  delete_worker(worker: WorkerApsi){
    if(confirm('¿Quiere eliminar a '+ worker.name +' de la base de datos?' )){
      this._worker_service.delete_worker(worker).subscribe(data =>{
        this.toastr.warning(worker.name +' fue eliminado exitosamente','Empleado eliminado');
        this._worker_service.get_worker();
      }, error => {
        this.toastr.error('No se pudo eliminar el empleado','Error en servidor');
          console.log(error);
      })
    }
  }
  edit_worker(worker: WorkerApsi){
    this._worker_service.update_worker(worker);
  }

  search(){ 
    if (this.form.get('text')?.value != null){
      this.text = this.form.get('text')?.value;
      console.log(this.text);   
      this.form.reset();
    }else{
      this.text = '';
    }
    
  }
  
}
