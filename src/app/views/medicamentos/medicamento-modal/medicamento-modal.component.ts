import { Component, OnInit, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Medicamento } from 'src/app/model/medicamento';
import { MedicamentosService } from '../../../service/medicamentos.service';
import { Inject } from '@angular/core';
import { Laboratorios } from '../../../model/laboratorios';
import { LaboratoriosService } from '../../../service/laboratorios.service';

@Component({
  selector: 'app-medicamento-modal',
  templateUrl: './medicamento-modal.component.html',
  styleUrls: ['./medicamento-modal.component.css']
})
export class MedicamentoModalComponent implements OnInit {

  medicamento: Medicamento;
  laboratorio: Laboratorios[];

  constructor(
    private dialogRef: MatDialogRef<MedicamentoModalComponent>,
    private medicamentosService: MedicamentosService,
    private laboratoriosService: LaboratoriosService,
    @Inject(MAT_DIALOG_DATA) private data: Medicamento
  ) { }

  ngOnInit(): void {
    this.medicamento = new Medicamento();
    this.medicamento.idMedicamento = this.data.idMedicamento;
    this.medicamento.nombre = this.data.nombre;
    this.medicamento.laboratorio = this.data.laboratorio;
    this.medicamento.fechaFabricacion = this.data.fechaFabricacion;
    this.medicamento.fechaVencimiento = this.data.fechaVencimiento;
    this.medicamento.cantidadStock = this.data.cantidadStock;
    this.medicamento.valorUnitario = this.data.valorUnitario;

    this.laboratoriosService.listar().subscribe(data => {
      this.laboratorio = data;
    });

  }

  aceptar() {
    if(this.medicamento != null && this.medicamento.idMedicamento >0) { 
      this.medicamentosService.editar(this.medicamento).subscribe(()=>{//modificar
        return this.medicamentosService.listar().subscribe(data=> {
           this.medicamentosService.medicamentoActualizar.next(data); //carga los medicamentos luego de actualizar
         })
       });
    } else {
      this.medicamentosService.crear(this.medicamento).subscribe(()=>{ //crear
        return this.medicamentosService.listar().subscribe(data => {
          this.medicamentosService.medicamentoActualizar.next(data);
        })
      })
    }

    //crear medicamento
    
    this.cerrar();
  }
  cerrar() {
    this.dialogRef.close();
  }

}
