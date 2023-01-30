import { Laboratorios } from "./laboratorios";

export class Medicamento {
    idMedicamento: Number;
    nombre: string;
    laboratorio: Laboratorios;
    fechaFabricacion: string;
    fechaVencimiento: string;
    cantidadStock: Number;
    valorUnitario: Number;
}