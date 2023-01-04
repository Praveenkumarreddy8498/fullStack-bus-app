import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { Location } from '@angular/common';
import { UtilService } from 'src/app/services/util.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table-data.component.html',
  styleUrls: ['./view-table-data.component.css'],
})
export class ViewTableDataComponent implements OnInit {
  bus!: Bus;
  busid: number = 0;
  user!:string;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router:Router,
    private _busService: BusService,
    private _utilService:UtilService,
    private _snackBar:MatSnackBar,
    private _location: Location
  ) {}
  ngOnInit(): void {
    this.user=this._utilService.getUserRole();
    this._activatedRoute.paramMap.subscribe((map) => {
      let bid = map.get('id');
      if (bid) this.busid = parseInt(bid);
    });
    this._busService.getBusById(this.busid).subscribe({
      next: (data: any) => {
        this.bus = data;
      },
    });
  }
  backClicked() {
    this._location.back();
  }

  onEdit(){
    console.log(this.busid);
    this._router.navigate(['/editForm', this.busid]);
  }
  onDelete(){
    this._busService.deleteById(this.busid).subscribe({
      next: (data) => console.log(data),
      error: (error) => {
        if (error.statusText == 'OK') {
          this._snackBar.open(`Bus With id ${this.busid} is Deleted`, 'OK');
          this._router.navigate(['/dashboard']);
        }
      },
    });

  }

}
