import { Company } from './../../core/models/Response/company.model';
import { TablesFunctionsService } from './../../core/services/tables-functions.service';
import { ReportService } from './../../core/services/report.service';
import { AfterViewInit, OnInit } from '@angular/core';
import { CompaniesService } from '../../core/services/companies.service';
import { Observable } from 'rxjs';
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

export class CompaniesComponent implements OnInit{
  file_name : string = "Companies Report";
  @ViewChild('TABLE') table: ElementRef;
  searchText:string;
  company: Company ;
  companies_observable: any;
  printedBody: any[];
  displayedColumns: string[] = ['id','arName', 'enName','actions'];
  
  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  companies_data: any;
  companies_array: any[] = [];
  dataSource: MatTableDataSource<Company>; 
  img = "../assets/img/tim.png";
  result:  Company;

  constructor(
     private companiesService: CompaniesService,
     private reportService: ReportService,
     private tablesFunctionsService: TablesFunctionsService
     ) { }

  ngOnInit() {
    this.LoadCompanies();
    // this.loadCom()
  }


  
  private LoadCompanies() {
    this.companies_observable = this.companiesService.readonlyactivitiesModel;
    this.companiesService.getCompanies();
    this.companies_data = this.companies_observable.forEach((item) => {
      this.companies_array = item;
      debugger
      this.dataSource = new MatTableDataSource(this.companies_array);
      this.dataSource.sort = this.sort;
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
    this.tablesFunctionsService.ExportTOExcel(data,this.file_name);
  }
  table_colums = [
    { header:'id', dataKey: 'id' },
    { header: 'arName', dataKey: 'arName' },
    { header: 'enName', dataKey: 'enName' },
  ];
  //#region 

  downloadAsPDF(){
    this.tablesFunctionsService.downloadAsPdfServiceMethod(this.table_colums, this.companies_array,this.img,this.file_name);
  }

}


















