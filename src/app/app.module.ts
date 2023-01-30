import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MedicamentosComponent } from './views/medicamentos/medicamentos.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ConfirmDialogComponent } from './views/medicamentos/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MedicamentoModalComponent } from './views/medicamentos/medicamento-modal/medicamento-modal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorEsp } from './resources/mat-paginator';
import {MatSortModule} from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    MedicamentosComponent,
    ConfirmDialogComponent,
    MedicamentoModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: MatPaginatorEsp}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
