import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { JsonPipe, Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

interface BusData {
  value: string;
}

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  bus!: Bus;
  editBus!: Bus;
  editForm!: boolean;

  chooser: boolean[] = [true, false];
  busTypeSelect: BusData[] = [
    { value: 'Electric' },
    { value: 'Petrol' },
    { value: 'Diesel' },
    { value: 'EcoFriendly' },
  ];
  busServiceTypeSelect: BusData[] = [{ value: 'Seater' }, { value: 'Sleeper' }];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _busService: BusService,
    private _utilService: UtilService,
    private _location: Location,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((map) => {
      let bId = map.get('id');

      if (bId) {
        this.editForm = true;
        this._busService.getBusById(parseInt(bId)).subscribe({
          next: (data) => {
            this.addBusForm.setValue(data);

            this.addBusForm.patchValue({
              scheduleDepartureDateTime: this._utilService.dateUtil(
                data.scheduleDepartureDateTime
              ),
              scheduleArrivalDateTime: this._utilService.dateUtil(
                data.scheduleArrivalDateTime
              ),
              estimatedArrivalDateTime: this._utilService.dateUtil(
                data.estimatedArrivalDateTime
              ),
            });
          },
        });
      }
    });
  }

  addBusForm = new FormGroup({
    busId: new FormControl<number | null>(null, Validators.required),
    busServiceNum: new FormControl<number | null>(null, Validators.required),
    busPlateNum: new FormControl('', Validators.required),
    busType: new FormControl('', Validators.required),
    busServiceType: new FormControl('', Validators.required),
    busCapacity: new FormControl<number | null>(null, Validators.required),
    startingPoint: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    busStops: new FormControl<number | null>(null, Validators.required),
    busDuration: new FormControl('', Validators.required),
    scheduleDepartureDateTime: new FormControl('', Validators.required),
    scheduleArrivalDateTime: new FormControl('', Validators.required),
    estimatedArrivalDateTime: new FormControl('', Validators.required),
    fareAmount: new FormControl<number | null>(null, Validators.required),
    fareTax: new FormControl<number | null>(null, Validators.required),
    totalFare: new FormControl<number | null>(null, Validators.required),
    flexiTicket: new FormControl<boolean | null>(null, Validators.required),
    movieEnabled: new FormControl<boolean | null>(null, Validators.required),
    rating: new FormControl<number | null>(null, Validators.required),
    runningStatus: new FormControl<boolean | null>(null, Validators.required),
  });
  onAddBus(addBus: any) {
    if (this.editForm) {
    
      this._busService.updateBus(addBus.value).subscribe({
        next: (data) => {
        },
        error: (error) => {
          if (error.statusText == 'OK') {
            this._snackBar.open(`Bus with Id ${addBus.value.busId} is Updated `, 'OK');
            this._router.navigate(['/dashboard']);
          }
        },
      });
    } else {
      this._busService.addBus(addBus.value).subscribe({
        next: (data) => console.log(data),
        error: (error) =>{
          if (error.statusText == 'OK') {
            this._snackBar.open(`Bus with Id ${addBus.value.busId} is Added `, 'OK');
            this._router.navigate(['/dashboard']);
          }
        } ,
        complete: () => console.log('Bus Added'),
      });
    }
  }
  backClicked() {
    this._location.back();
  }
}
