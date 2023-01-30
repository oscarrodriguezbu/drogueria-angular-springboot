import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MedicamentosService } from 'src/app/service/medicamentos.service';
import { Medicamento } from '../../model/medicamento';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MedicamentoModalComponent } from './medicamento-modal/medicamento-modal.component';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent implements OnInit {

  displayedColumns = ['idMedicamento', 'nombre', 'laboratorio', 'fechaFabricacion', 'fechaVencimiento', 'cantidadStock', 'valorUnitario', 'editar-eliminar-vender'];
  dataSource: MatTableDataSource<Medicamento>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //paginador
  cant: number = 0;

  // medicamento: Medicamento[];

  constructor(
    private dialog: MatDialog,
    private medicamentoService: MedicamentosService
  ) { }

  ngOnInit(): void {
    // this.medicamentoService.listar().subscribe(data => this.medicamento=data); //mostrar lista de medicamentos
    // this.medicamentoService.listar().subscribe(data => {
    //   this.dataSource = new MatTableDataSource(data);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }); //mostrar lista de medicamentos

    this.medicamentoService.listpageable(0,5).subscribe(data => {
      this.cant = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.medicamentoService.medicamentoActualizar.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; //paginacion dependiendo del datasource
      this.dataSource.sort = this.sort; //ordenar paginador
    }); //carga cuando se de apectar en el modal de actualizar

  }

  openModal(medicamento?: Medicamento) {
    let medicine = medicamento != null ? medicamento : new Medicamento(); //crea si la data viene vacia

    this.dialog.open(MedicamentoModalComponent, {
      width: '260px',
      data: medicine
    })
  }

  onDelete(id: number) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {

    });
    dialogRef.afterClosed().subscribe(estado => {
      if (estado) {
        this.medicamentoService.eliminar(id).subscribe(() => {
          this.medicamentoService.listar().subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
          })
        })
      }
    })
  }

  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  Paginator(e: any) {
    this.medicamentoService.listpageable(e.pageIndex,e.pageSize).subscribe(data => {
      this.cant = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);      
      this.dataSource.sort = this.sort;
    });
  }

  onBuy() {

  }

}
