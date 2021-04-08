import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { AlertsService } from 'angular-alert-module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  profileForm: FormGroup;
  title = 'registro';
  showpaneluser:boolean = false; 
  showbtnsave:boolean = false; 
  showbtnedit:boolean = false; 
  showbtndelete:boolean = false;
  nombre:string;
  listperson = [];
  role:number;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(public formBuilder: FormBuilder, 
              private http: HttpClient,
              private alerts: AlertsService){
    this.profileForm = this.formBuilder.group({
      idusuario:[''],
      nombre:['', [Validators.required]],
      rol: this.formBuilder.group({
        idrol: this.role
      }),
      activo:['', [Validators.required]],
    });
    
  }

  get rol() : FormArray {
    return this.profileForm.get("rol") as FormArray
  }

  Crear(){
    this.showpaneluser = true;
    this.showbtnsave = true;
    this.showbtnedit = false;
    this.showbtndelete = false;
    this.profileForm.patchValue({idusuario: "",nombre: "",rol: "",activo: 1});
  }

  limpiar(){
    this.nombre = "";
    this.profileForm.patchValue({idusuario: "",nombre: "",rol: "",activo: 1});
  }

  consultar(){
    if(this.nombre?.length > 0){
      this.BuscarporNombre(this.nombre);
    }else{
      this.SearthAll();
    }
  }

  onSubmit(){
    console.log(this.profileForm.value);
    return new Promise((resolve, reject) => {
      this.http.post("http://localhost:8080/api/clientes",this.profileForm.value, {headers: this.httpHeaders}).subscribe(
        async (data: any) => {
         resolve(data);
        }
      )
    });
  }

  save(){
    this.onSubmit();
  }

  editar(){
      var id = this.profileForm.value.idusuario;
      this.http.put("http://localhost:8080/api/clientes/"+id,this.profileForm.value, {headers: this.httpHeaders}).subscribe(
        async (data: any) => {
          if(data){
            this.alerts.setMessage('Datos actualizados','success');
          }
        }
      )
  }


  eliminar(){
    var id = this.profileForm.value.idusuario;
    this.http.delete("http://localhost:8080/api/clientes/"+id, {headers: this.httpHeaders}).subscribe(
        async () => {
            this.alerts.setMessage('Borrado con exito','success');
            this.SearthAll();
            this.profileForm.patchValue({idusuario: "",nombre: "",rol: "",activo: 1});
        }
    )
  }

  BuscarporNombre(nombre){
    this.http.get("http://localhost:8080/api/cliente/name/"+nombre).subscribe(
      async (data: any) => { 
        this.listperson = data;
      }
    );
  }
  
  SelectUser(user){
    this.showpaneluser = true;
    this.showbtnedit = true;
    this.showbtndelete = true;
    this.showbtnsave = false;
    this.profileForm.patchValue({
      idusuario: user.idusuario,
      nombre: user.nombre,
      rol: user.rol,
      activo: user.activo,
    });
  }

  SearthAll(){
     this.http.get("http://localhost:8080/api/clientes").subscribe(
      async (data: any) => { 
       this.listperson = data;
      })  
  }
}
