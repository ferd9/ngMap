import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {Map} from 'mapbox-gl';


//(mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoiZmVyZDkiLCJhIjoiY2xzdnZwMmoyMGV6djJtb3M2YTVmM2o0MCJ9.uSQV_rRcqorGcO_wKf9bvg';

@Component({
  selector: 'app-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent{

  @ViewChild('map') divMap?: ElementRef;



  ngAfterViewInit(): void {

    if(!this.divMap) throw 'Div no encontrado';
   // console.log(this.divMap);

    const map = new Map({
      accessToken: 'pk.eyJ1IjoiZmVyZDkiLCJhIjoiY2xzdnZwMmoyMGV6djJtb3M2YTVmM2o0MCJ9.uSQV_rRcqorGcO_wKf9bvg',
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}
