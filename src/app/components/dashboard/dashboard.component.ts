import {
  Component,
  AfterViewInit,
  OnInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { UtilService } from 'src/app/services/util.service';
import {Location} from '@angular/common'
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
  

  

  busList: Bus[] = [];
  bus!: Bus;
  userRoles!: string[];
  user!: string;
  pageEvent!: PageEvent;
  pageNo: number = 1;
  pageSize: number = 10;
  documentCount!: number;
  displayedColumns!: string[];
  columns!: string[];
  backButton!:boolean;
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
    // private _authService: AuthService,
    private _utilService:UtilService,
    private _location:Location
  ) {}

  ngOnInit(): void {
    console.log(this._utilService.getUserRole());
    this.user=this._utilService.getUserRole();
    console.log(this.user);
    // this.userRoles = this._authService.getRoles();
    // console.log(this.userRoles);
    // if (this.userRoles.includes('manager')) {
    //   this.user="manager";
    // }
    // this.user = this.userRoles[3];

    this._busService.getCount().subscribe({
      next: (data) => {
        console.log(data);
        this.documentCount = data;
        this._busService
          .getBusDataBySort('busId', 'asc', this.pageNo, data)
          .subscribe({
            next: (data) => {
              // console.log(data);
              this.busList = data;
              data.forEach((element) => {
                this.displayedColumns = Object.keys(element);
                if (this.user === 'manager' || this.user === 'editor') {
                  this.displayedColumns.push('editBusData', 'deleteBusData');
                }

                this.columns = this.displayedColumns;
              });
            },
          });
      },
    });
  }
  // displayedColumns: string[] = [
  //   'busId',
  //   'busServiceNum',
  //   'busPlateNum',
  //   'busType',
  //   'busServiceType',
  //   'busCapacity',
  //   'startingPoint',
  //   'destination',
  //   'busStops',
  //   'busDuration',
  //   'scheduleDepartureDateTime',
  //   'scheduleArrivalDateTime',
  //   'estimatedArrivalDateTime',
  //   'fareAmount',
  //   'fareTax',
  //   'totalFare',
  //   'flexiTicket',
  //   'movieEnabled',
  //   'rating',
  //   'runningStatus',
  //   'editBusData',
  //   'deleteBusData',
  // ];
  columnsForDisplay: string[] = this.displayedColumns;

  onAddBus(addBusForm: NgForm) {
    console.log(addBusForm.value);
    this.bus = addBusForm.value;
    console.log(this.bus);
  }

  showDetails(event: Event, bus: Bus) {
    console.log((event.target as HTMLInputElement).getAttribute('type'));
    // this._router.navigate(['/view-details', bus.busId]);
  }
  onChangePage(event: PageEvent) {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this._busService
      .getBusDataBySort('busId', 'asc', event.pageIndex + 1, event.pageSize)
      .subscribe({
        next: (data) => {
          // console.log(data);
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
    // console.log(this.sortControlForm.value.sortTypeControl);
  }

  onColumnSelect(event: any) {
    this.backButton=true;
    console.log(event.value);
    this.displayedColumns = event.value;
    console.log(this.displayedColumns);
  }
 
  selectAll(){
    this._location.back();
  }
}
