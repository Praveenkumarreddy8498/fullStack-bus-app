import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { UtilService } from 'src/app/services/util.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table'

interface sortData {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
})
export class TableViewComponent implements OnInit {
  @Input() busList!: Bus[];
  bus!: Bus;
  user!: string;
  pageEvent!: PageEvent;
  @Input() pageNo!: number ;
  @Input() pageSize!: number;
  @Input() documentCount!: number;
  @Input() displayedColumns!: string[];
  @Input() columns!: string[];
  sortTypeToggle: boolean = false;
  // dataSource = new MatTableDataSource(this.busList);
  // dataSource.data=this.busList;
  sortTypeChooser: sortData[] = [
    { value: 'asc', viewValue: 'Ascending' },
    { value: 'desc', viewValue: 'Descending' },
  ];
  sortChooser: sortData[] = [
    { value: 'busId', viewValue: 'busId' },
    // { value: 'busServiceNum', viewValue: 'busServiceNum' },
    // { value: 'busPlateNum', viewValue: 'busPlateNum' },
    // { value: 'busType', viewValue: 'busType' },
    // { value: 'busServiceType', viewValue: 'busServiceType' },
    { value: 'busCapacity', viewValue: 'busCapacity' },
    // { value: 'startingPoint', viewValue: 'startingPoint' },
    // { value: 'destination', viewValue: 'destination' },
    { value: 'busStops', viewValue: 'busStops' },
    { value: 'busDuration', viewValue: 'busDuration' },
    { value: 'dep_date', viewValue: 'scheduleDepartureDateTime' },
    { value: 'arr_date', viewValue: 'scheduleArrivalDateTime' },
    { value: 'est_date', viewValue: 'estimatedArrivalDateTime' },
    { value: 'fareAmount', viewValue: 'fareAmount' },
    { value: 'fareTax', viewValue: 'fareTax' },
    { value: 'totalFare', viewValue: 'totalFare' },
    { value: 'flexiTicket', viewValue: 'flexiTicket' },
    { value: 'movieEnabled', viewValue: 'movieEnabled' },
    { value: 'rating', viewValue: 'rating' },
    { value: 'runningStatus', viewValue: 'runningStatus' },
  ];
  sortControlForm = new FormGroup({
    sortTypeControl: new FormControl('', Validators.required),
    sortColumnControl: new FormControl('', Validators.required),
  });
  displayColumnControl = new FormControl();
  constructor(
    private _busService: BusService,
    private _router: Router,
    private _utilService: UtilService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    // console.log(this.pageNo);
    // console.log(this.pageSize);

    // console.log(this.busList);
 
  // console.log(this.dataSource.data);
    this.user = this._utilService.getUserRole();
  }

  @Input() columnsForDisplay: string[] = this.displayedColumns;

  onAddBus(addBusForm: NgForm) {
    console.log(addBusForm.value);
    this.bus = addBusForm.value;
  }

  showDetails(event: Event, bus: Bus) {
    if ((event.target as HTMLElement).nodeName === 'MAT-ICON') {
      console.log(`Deleted`);
      return;
    }
    this._router.navigate(['/view-table-data',bus.busId]);
  }

  onDelete(id: number) {
    this._busService.deleteById(id).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
      complete: () => console.log('Deleted'),
    });
  }

  sortSelect(column: string) {
    this.sortTypeToggle = !this.sortTypeToggle;
    if (this.sortTypeToggle) {
     
      this._busService
        .getBusDataBySort(column, 'asc', this.pageNo, this.pageSize)
        .subscribe({
          next: (data) => {
            this.busList = data;
          },
        });
    } else if (!this.sortTypeToggle) {
     
      this._busService
        .getBusDataBySort(column, 'desc', this.pageNo , this.pageSize)
        .subscribe({
          next: (data) => {
            this.busList = data;
          },
        });
    }
  }
//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
// }
}
