import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OfficeDataService } from '../office-data.service';
import { Observable, concat } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss']
})
export class OfficesComponent {

  officeLevelForm: Array<OfficeMap> = new Array<OfficeMap>();
  getofficelevels: Array<OfficeMap> = new Array<OfficeMap>();

  addLocation: AddLocation = new AddLocation();
  isValidateLocation: boolean = false;

  tableRecord: Array<OfficeMap> = new Array<OfficeMap>();

  editLocation: AddLocation = new AddLocation();
  editLocationIndex: number;


  constructor(private _fb: FormBuilder, private officesService: OfficeDataService) { }

  ngOnInit(): void {
    this.getAllData();
    this.getAllTableRecord();
  }

  //Add Fields
  addAddress(): void {
    this.officeLevelForm.push(new OfficeMap());
  }

  //Remove Fields
  removeAddress(index: number): void {
    this.officeLevelForm.splice(index);
  }

  // get all data of office level map
  getAllData() {
    this.officesService.getAllOfficeMap().subscribe({
      next: (res) => {
        this.officeLevelForm = res as Array<OfficeMap>;
      },
      error: (err) => {
        // console.log(err);
      },
      complete: () => {
      }
    });
  }

  // form submit via API
  submitForm() {
    let txUpdateOperations: Observable<any>[] = [];
    this.officeLevelForm.forEach((item, index) => {
      txUpdateOperations.push(this.officesService.addOfficeMapData(item));
    });
    if (txUpdateOperations.length > 0) {
      concat(...txUpdateOperations).subscribe(t => {
      }, (error: HttpErrorResponse) => {
      }, () => { // Complete
        this.getAllData();
      });
    }
  }

  // GET form data
  getOfficeLevel() {
    this.officesService.getAllOfficeMap().subscribe({
      next: (res) => {
        this.getofficelevels = res as Array<OfficeMap>;
      },
      error: (err) => {
        // console.log(err);
      },
      complete: () => {
        this.deleteAllData();
      }
    });
  }

  deleteAllData() {
    let txDeleteOperations: Observable<any>[] = [];
    this.getofficelevels.forEach((item, index) => {
      txDeleteOperations.push(this.officesService.deleteRecord((index + 1)));
    });

    if (txDeleteOperations.length > 0) {
      concat(...txDeleteOperations).subscribe(t => {
      }, (error: HttpErrorResponse) => {
      }, () => { // Complete
        this.submitForm();
      });
    } else {
      this.submitForm();
    }
  }

  // check required field validation
  checkOfficeValidation() {
    if (this.addLocation.level != '' && this.addLocation.officeName != '') {
      this.isValidateLocation = true;
    } else {
      this.isValidateLocation = false;
    }
  }

  // Add Office Location
  addOfficeLocation() {
    let row = {};
    debugger;
    for (let item of this.officeLevelForm) {
      row[item.level] = item.level;
    }
    row['address'] = this.addLocation.address;
    row['officeName'] = this.addLocation.officeName;
    this.officesService.addtableRecord(row).subscribe({
      next: (res) => { },
      error: (err) => { },
      complete: () => { }
    });
  }

  getAllTableRecord() {
    this.officesService.getTableRecord().subscribe({
      next: (res: any) => {
        this.tableRecord = res;
      },
      error: (err) => { },
      complete: () => { },
    });
  }

  editRecord() {
    this.officesService.updateTableData(this.editLocation).subscribe({
      next: (res) => {
        this.getAllTableRecord();
      }
    });
  }

  deleteRecord(i) {
    this.officesService.deleteTableData(i + 1).subscribe({
      next: () => {
        this.getAllTableRecord();
      },
      error: (err) => { },
      complete: () => { },
    });
  }

  filleditRecord(item, index) {
    this.editLocation = item;
    this.editLocationIndex = index;
  }


}


export class OfficeMap {
  level: string = '';
}

export class AddLocation {
  level: string = '';
  officeName: string = '';
  address: string = '';
}