export class Plato{
    _id: number;
    nombre: string;
    urlImagen: string;
    precio: number;

    constructor(id: number, nombre: string, urlImagen: string, precio: number){
        this._id = id;
        this.nombre = nombre;
        this.urlImagen = urlImagen;
        this.precio = precio;
   }  
}