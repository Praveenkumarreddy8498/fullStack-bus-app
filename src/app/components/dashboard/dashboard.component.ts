import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { UtilService } from 'src/app/services/util.service';
interface sortData {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user!: string;
  documentCount!: number;
  displayedColumns!: string[];
  selectAllColumns!: string[];
  columns!: string[];
  pageNo: number = 1;
  pageSize: number = 10;
  busList!: Bus[];
  gridView: boolean = false;
  selectButton: boolean = false;
  choosedSortColumn: string = 'busId';
  choosedSortType: string = 'asc';
  columnChooseButton: boolean = false;
  filterValue!: string;
  sortTypeChooser: sortData[] = [
    { value: 'asc', viewValue: 'Ascending' },
    { value: 'desc', viewValue: 'Descending' },
  ];
  sortChooser: sortData[] = [
    { value: 'busId', viewValue: 'busId' },
    { value: 'busServiceNum', viewValue: 'busServiceNum' },
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
    private _utilService: UtilService,
    private _busService: BusService
  ) {}

  ngOnInit(): void {
    this.user = this._utilService.getUserRole();
    this._busService.getCount().subscribe({
      next: (data) => {
        this.documentCount = data;
        this._busService
          .getBusDataBySort('busId', 'asc', this.pageNo, data)
          .subscribe({
            next: (data) => {
              this.busList = data;
              data.forEach((element) => {
                this.displayedColumns = Object.keys(element);

                if (this.user === 'manager' || this.user === 'editor') {
                  this.displayedColumns.push('editBusData', 'deleteBusData');
                }
                this.selectAllColumns = this.displayedColumns;
                this.columns = this.displayedColumns;
              });
            },
          });
      },
    });
  }
  onColumnSelect(event: any) {
    this.selectButton = true;
    console.log(event.value);
    this.displayedColumns = event.value;
    console.log(this.displayedColumns);
  }
  onSort(sortForm: any) {
    console.log(this.pageNo);
    console.log(this.pageSize);
    this.choosedSortColumn = sortForm.sortColumnControl;
    this.choosedSortType = sortForm.sortTypeControl;
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
  onChangePage(event: PageEvent) {
    this.pageNo = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this._busService
      .getBusDataBySort(
        this.choosedSortColumn,
        this.choosedSortType,
        event.pageIndex + 1,
        event.pageSize
      )
      .subscribe({
        next: (data) => {
          this.busList = data;
        },
      });
  }
  toggleView() {
    this.gridView = !this.gridView;
  }
  selectAll() {
    this.displayedColumns = this.selectAllColumns;
  }
  toggleColumnChooser() {
    this.columnChooseButton = !this.columnChooseButton;
  }
  doFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
  }
}
