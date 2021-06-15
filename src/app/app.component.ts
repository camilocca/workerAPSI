import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component } from '@angular/core';
import { TemplateService } from './services/template.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor (public _template_service: TemplateService){}
  title = 'Emplados APIS';

  
}


