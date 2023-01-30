import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Laboratorios } from '../model/laboratorios';

@Injectable({
  providedIn: 'root'
})
export class LaboratoriosService {

  private url: string = 'http://localhost:8080/laboratorio';


  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Laboratorios[]>(this.url);
  }
}
