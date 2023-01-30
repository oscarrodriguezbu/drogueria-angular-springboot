import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicamento } from '../model/medicamento';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {

  medicamentoActualizar = new Subject<Medicamento[]>(); //subjetct para saber que vamos a hacer al actualizar

  private url: string = 'http://localhost:8080/medicamentos';

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Medicamento[]>(this.url);
  }

  crear(medicamento: Medicamento) {
    return this.http.post(this.url, medicamento);
  }

  editar(medicamento: Medicamento) {
    return this.http.put(this.url, medicamento);
  }
  
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listpageable (pag: number, tam: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${pag}&size=${tam}`);
  }

  comprar() {

  }
}
