import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfficeDataService {

  officeMap = 'http://localhost:3000/offficeHierarchyMap';

  tableData = 'http://localhost:3000/tableRecord';

  constructor(private http: HttpClient) { }

  addOfficeMapData(formData: any) {
    return this.http.post(this.officeMap, formData);
  }

  getAllOfficeMap() {
    return this.http.get(this.officeMap);
  }

  getOfficeMapById(id: number) {
    let url = `${this.officeMap}/${id}`;
    return this.http.get(url);
  }

  deleteRecord(id: number) {
    let url = `${this.officeMap}/${id}`;
    return this.http.delete(url);
  }


  // table Record 
  addtableRecord(data: any) {
    return this.http.post(this.tableData, data);
  }

  // get table record
  getTableRecord() {
    return this.http.get(this.tableData);
  }

  // delete record
  deleteTableData(id: any) {
    let url = `${this.tableData}/${id}`;
    return this.http.delete(url);
  }

  updateTableData(body) {
    return this.http.put(`${this.tableData}/${body.id}`, body);
  }

}
