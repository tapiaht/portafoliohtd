import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando=true;
  productos: Producto[]=[];
  constructor(private http:HttpClient) { 
  
    this.cargarProductos();
  }

  private cargarProductos() {

    this.http.get<Producto[]> ('https://angular-html-8ed23-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe(async (resp: Producto[]) => {
      console.log(resp);
      this.productos=resp;
      setTimeout(() => {
        this.cargando=false;
      }, 2000);
      
      
    })
  }
}
