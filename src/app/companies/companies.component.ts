import { TablesFunctionsService } from './../../core/services/tables-functions.service';
import { ReportService } from './../../core/services/report.service';
import { AfterViewInit, OnInit } from '@angular/core';
import { CompaniesService } from '../../core/services/companies.service';
import { Observable } from 'rxjs';
import { Company } from 'core/models/companies.model';
import { Component, ViewChild, ElementRef } from '@angular/core';  
import * as jspdf from 'jspdf';  
import { Base64Font } from 'core/helper/base64-font';
import autoTable from 'jspdf-autotable';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
var jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
 
})

export class CompaniesComponent implements OnInit,AfterViewInit{
  @ViewChild('TABLE') table: ElementRef;
  searchText:string;
  company: Company ;
  companies_observable: Observable<Company[]>;
  printedBody: any[];
  displayedColumns: string[] = ['ID','NameAr', 'NameEn','actions'];
  
  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  companies_data: any;
  companies_array: Company[] = [];
  dataSource: MatTableDataSource<Company>; 

  constructor(
     private companiesService: CompaniesService,
     private reportService: ReportService,
     private tablesFunctionsService: TablesFunctionsService
     ) { }

  ngOnInit() {
    this.LoadCompanies();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private LoadCompanies() {
    this.companies_observable = this.companiesService.readonlyactivitiesModel;
    this.companiesService.getCompanies();
    this.companies_data = this.companies_observable.forEach((item) => {
      this.companies_array = item;
      debugger
      this.dataSource = new MatTableDataSource(this.companies_array);
      // this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });  
  }

  catchCompany(company: Company){
    this.company = company;
  }

  deleteCompany(company: Company) {
    this.companiesService.Delete(company.id);
    this.company = null;
  }


@ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  //#region  exportToExcel
  exportToExcel() {
    var data = this.table.nativeElement;  
    this.tablesFunctionsService.ExportTOExcel(data);
  }
  //#region 
  downloadAsPDF() {
    const doc = new jspdf('p', 'mm', 'a4');
    const AmiriRegular = Base64Font.FONT;
    const img = "src/assets/images/Images/Entities_0.png";
    
    doc.addFileToVFS('Amiri-Regular.ttf', AmiriRegular);
    doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
    doc.setFont('Amiri'); // set font
    doc.text("Companies Report", 150, 30);
    //  date
    const date = new Date().toLocaleDateString('en-GB');
    //  image 
    // const imgData = this.reportService.imageBase64(img);
    const imgData = this.reportService.getBase64FromImageUrl("../assets/images/Images/Entities_0.png");
    // const imgData = this.reportService.getBase64FromImageUrl("src/assets/images/Images/Entities_0.png");
    doc.addImage(imgData, 'JPEG', 15, 5, 60, 45);
    doc.text("Corrective And Preventive Actions Report", 150, 30);
    doc.text(date, 500, 30);
    doc.rect(3, 3, doc.internal.pageSize.width - 6, doc.internal.pageSize.height - 6, 'S');
   this.companies_observable.forEach(item => 
    {
      this.printedBody = item;
      console.log("Printed Body = ", item);
        autoTable(doc, {
          columns: [
            { header:'ID', dataKey: 'id' },
            { header: 'Ar Name', dataKey: 'arName' },
            { header: 'En Name', dataKey: 'enName' },
          ],
        body: this.printedBody,
  
        margin: { horizontal: 7, top: 50 },
        bodyStyles: { valign: 'top' },
        useCss: true,
        theme: 'striped',
        styles: {
          font: 'Amiri',
          halign: 'left',
          lineColor: [44, 62, 80],
          lineWidth: 1
        },
        columnStyles: {
          name: {
            font: 'Amiri',
          },
        },
         
        });
      
    });
    // doc.output('dataurlnewwindow')
      doc.save("test.pdf");
  }












   




}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: Element[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];

















