import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {LngLat, Map, Marker} from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent {

  @Input() lngLat?: [number, number];

  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;

  ngAfterViewInit(): void {

    if(!this.divMap) throw 'Div no encontrado';
    if(!this.lngLat) throw 'Longitud y latitud nulas';
   // console.log(this.divMap);

    this.map = new Map({
      accessToken: 'pk.eyJ1IjoiZmVyZDkiLCJhIjoiY2xzdnZwMmoyMGV6djJtb3M2YTVmM2o0MCJ9.uSQV_rRcqorGcO_wKf9bvg',
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
    });

    new Marker()
    .setLngLat(this.lngLat)
    .addTo(this.map);
  }
}
