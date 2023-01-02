import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { UtilService } from 'src/app/services/util.service';
import { Location } from '@angular/common';
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
  @Input() busList: Bus[] = [];
  bus!: Bus;
  userRoles!: string[];
  user!: string;
  pageEvent!: PageEvent;
  pageNo: number = 1;
  pageSize: number = 10;
  @Input() documentCount!: number;
  @Input() displayedColumns!: string[];
  @Input() columns!: string[];
  backButton!: boolean;
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
    this.user = this._utilService.getUserRole();
  }

  @Input() columnsForDisplay: string[] = this.displayedColumns;

  onAddBus(addBusForm: NgForm) {
    console.log(addBusForm.value);
    this.bus = addBusForm.value;
  }

  showDetails(event: Event, bus: Bus) {
    // console.log((event.target as HTMLElement).nodeName);
    if ((event.target as HTMLElement).nodeName === 'MAT-ICON') {
      console.log(`Deleted`);
      return;
    }

    this._router.navigate(['/view-table-data', bus.busId]);
  }
  onChangePage(event: PageEvent) {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this._busService
      .getBusDataBySort('busId', 'asc', event.pageIndex + 1, event.pageSize)
      .subscribe({
        next: (data) => {
          this.busList = data;
        },
      });
  }
  onDelete(id: number) {
    this._busService.deleteById(id).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
      complete: () => console.log('Deleted'),
    });
    this._router.navigate(['/dashboard']);

  }
  onSort(sortForm: any) {
    this._busService
      .getBusDataBySort(
        sortForm.sortColumnControl,
        sortForm.sortTypeControl,
        this.pageNo,
        this.pageSize
      )
      .subscribe({
        next: (data) => {
          this.busList = data;
        },
      });
  }

  onColumnSelect(event: any) {
    this.backButton = true;
    console.log(event.value);
    this.displayedColumns = event.value;
    console.log(this.displayedColumns);
  }

  selectAll() {
    this._location.back();
  }
}
