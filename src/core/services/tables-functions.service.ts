import { ReportService } from './report.service';
import { Injectable } from '@angular/core';
import { Base64Font } from 'core/helper/base64-font';
import * as XLSX from 'xlsx';
import autoTable, { RowInput } from 'jspdf-autotable';
import * as jspdf from 'jspdf';  

var jsPDF = require('jspdf');
require('jspdf-autotable');
@Injectable({
  providedIn: 'root'
})
export class TablesFunctionsService {


  constructor(private reportService: ReportService) { }
    ExportTOExcel(tableSrc,file_name)
    {
        const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(tableSrc);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        
        /* save to file */
        XLSX.writeFile(wb, file_name+'.xlsx');
    
  }

  downloadAsPdfServiceMethod(cols: any, body: any, header_img: string, report_title: string) {
    const doc = new jspdf('p', 'mm', 'a4');
    const AmiriRegular = Base64Font.FONT;
    doc.addFileToVFS('Amiri-Regular.ttf', AmiriRegular);
    doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
    doc.setFont('Amiri'); // set font
    doc.text(report_title, 150, 30);
    //  date
    const date = new Date().toLocaleDateString('en-GB');
    doc.text(date, 500, 30);
    doc.rect(3, 3, doc.internal.pageSize.width - 6, doc.internal.pageSize.height - 6, 'S');
  
     
    autoTable(doc, {
      columns: cols,
      body: body,

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
      
   
    //  load image using loadImage() function
    this.reportService.loadImage(header_img).then((header_img) => {
      doc.addImage(header_img, 'PNG', 10, 10);
      doc.save(report_title+'@'+`${date}`+'.pdf')
      
    });
   
    
  }
}
