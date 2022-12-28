import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css']
})
export class ViewTableComponent implements OnInit {
  busData!:Bus;
  busid: number = 0;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _busService: BusService
  ) {}
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((map) => {
      let bid = map.get('id');
      if (bid) this.busid = parseInt(bid);
    })
    this._busService.getBusById(this.busid).subscribe({
      next:(data: any)=>{
        console.log(data);
        this.busData=data;
      },
  });

}
}
