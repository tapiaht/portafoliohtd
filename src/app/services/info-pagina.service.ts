import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada=false;
  constructor( private http: HttpClient) {
    // console.log("se ejecuta servicio")
    this.http.get('assets/data/data-pagina.json')
      .subscribe ( (resp:InfoPagina) => {
        // console.log( resp['email']);
        this.cargada=true;
        this.info=resp;
        console.log(resp.nombre_corto);
      })
   }
}

