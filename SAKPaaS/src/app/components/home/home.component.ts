import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '../../generated/models/location'
import { Observable, of } from "rxjs";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { LocationDetailsComponent } from "../location-details/location-details.component";
import { MapComponent } from '../map/map.component';
import {SearchBarComponent} from "../search-bar/search-bar.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedLocation$: Observable<Location>;

  @ViewChild(MapComponent) mapComp: MapComponent;
  @ViewChild(SearchBarComponent) searchComp: SearchBarComponent;

  constructor(private _bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
  }

  onLocationEmitted(location: Location, fromMap: boolean) {
    this.selectedLocation$ = of(location);
    this.openBottomSheet(fromMap);
  }

  openBottomSheet(fromMap: boolean): void {
    const bottomSheetRef = this._bottomSheet.open(LocationDetailsComponent, { data: this.selectedLocation$ });
    bottomSheetRef.afterDismissed().subscribe(() => {
      if (fromMap){
        this.mapComp.deselect();
      } else {
        this.searchComp.dismiss();
      }
    });
  }
}
