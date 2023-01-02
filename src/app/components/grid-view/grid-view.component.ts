import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from 'src/app/models/bus';
@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css'],
})
export class GridViewComponent implements OnInit {
  @Input() busList: Bus[] = [];

  constructor() {}

  ngOnInit(): void {}
}
