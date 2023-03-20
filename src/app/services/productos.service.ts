import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';





@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando=true;
  productos: Producto[]=[];
  productosFiltrado: Producto[]=[];
  constructor(private http:HttpClient) { 
  
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise<void>((resolve,reject)=>{
          this.http.get<Producto[]> ('https://angular-html-8ed23-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe( (resp: Producto[]) => {
      // console.log(resp);
      this.productos=resp;
      this.cargando=false;
      resolve();
      setTimeout(() => {
        this.cargando=false;
      }, 2000);
      
    });
    });

  }
    getProducto( id: string){
      return this.http.get(`https://angular-html-8ed23-default-rtdb.firebaseio.com/productos/${id}.json`);
    }
    buscarProducto(termino:string){
      if (this.productos.length===0){
        //cargar productos
        this.cargarProductos().then(()=>{
          //ejecutar despues de tener los productos
          //apllicar filtro
          this.filtrarProductos(termino);
        });
      }else {
        //aplicar el filtro
        this.filtrarProductos(termino);
      }

    }
    private filtrarProductos(termino:string){
/*       this.productosFiltrado= this.productos.filter(producto=>{
        return true;
      });
      console.log(this.productosFiltrado); */
      // console.log(this.productos);
      this.productosFiltrado=[];
      termino=termino.toLocaleLowerCase();
      this.productos.forEach(prod=>{
        const tituloLower=prod.titulo.toLowerCase();
        if (prod.categoria.indexOf(termino)>=0 || tituloLower.indexOf(termino)>=0){
          this.productosFiltrado.push(prod);
        }
      })
    }
}
