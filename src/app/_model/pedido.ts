import { Cliente } from './cliente';
import { Detalle } from './detalle';

export class Pedido{
    _id: number;
    cliente: Cliente;
    fechaPedido: Date;
    total: number;
    detalle: Detalle[];    
}