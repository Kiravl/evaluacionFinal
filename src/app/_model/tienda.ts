export class Tienda {

    _id: string;
    nombre: string;
    direccion: string;
    fotoUrl: string;

    constructor(args: object = {}) {
        Object.keys(args).forEach(x => {
            switch (x) {
                case "_id": this._id = args[x]; break;
                case "nombre": this.nombre = args[x]; break;
                case "direccion": this.direccion = args[x]; break;
                case "fotoUrl": this.fotoUrl = args[x]; break;
                default: break;
            }
        });
    }

}
