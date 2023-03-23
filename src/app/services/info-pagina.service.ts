import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada=false;
  equipo: any[] = [];
  constructor( private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }
   
   private cargarInfo(){
// console.log("se ejecuta servicio")
this.http.get('assets/data/data-pagina.json')
.subscribe ( (resp:InfoPagina) => {
  // console.log( resp['email']);
  this.cargada=true;
  this.info=resp;
  // console.log(resp.nombre_corto);
   });
  }
 private cargarEquipo(){
  // console.log("se ejecuta servicio")
this.http.get('https://angular-html-8ed23-default-rtdb.firebaseio.com/equipo.json')
.subscribe ( (resp: any) => {
  // console.log( resp['email']);
  this.equipo=resp;
  // console.log(resp);
   });
 }
}