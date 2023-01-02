import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTableDataComponent } from './view-table-data.component';

describe('ViewTableDataComponent', () => {
  let component: ViewTableDataComponent;
  let fixture: ComponentFixture<ViewTableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTableDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
