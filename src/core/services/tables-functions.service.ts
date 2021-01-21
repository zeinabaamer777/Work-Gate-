import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class TablesFunctionsService {

  constructor() { }
    ExportTOExcel(tableSrc)
    {
        const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(tableSrc);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        
        /* save to file */
        XLSX.writeFile(wb, 'SheetJS.xlsx');
    
  }
}
