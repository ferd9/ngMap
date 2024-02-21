import { Component, ElementRef, ViewChild } from '@angular/core';
import {LngLat, Map, Marker} from 'mapbox-gl';

interface MarkerAndColor{
  color: string;
  marker: Marker;
}

interface PlainMarker{
  color: string;
  lngLat: number[];
}

@Component({
  selector: 'app-margers-page',
  templateUrl: './margers-page.component.html',
  styleUrl: './margers-page.component.css'
})
export class MargersPageComponent {


  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public zoom: number = 15;
  public map?: Map;

  public currentCenter: LngLat = new LngLat(-78.56882144987574, -9.081839275259867);

  ngAfterViewInit(): void {

    if(!this.divMap) throw 'Div no encontrado';
   // console.log(this.divMap);

    this.map = new Map({
      accessToken: 'pk.eyJ1IjoiZmVyZDkiLCJhIjoiY2xzdnZwMmoyMGV6djJtb3M2YTVmM2o0MCJ9.uSQV_rRcqorGcO_wKf9bvg',
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.readFromLocalStora();
    // const markerHtml = document. createElement('div');
    // markerHtml. innerHTML = 'Fernando'
    // const marker = new Marker(
    //   {
    //     element: markerHtml
    //   }
    // ).setLngLat(this.currentCenter).addTo(this.map);

  }

  createMarker(){
    if(!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMaker(lngLat, color);
  }

  addMaker(lngLat: LngLat, color: string):void{
    if(!this.map) return;

    const marker = new Marker(
      {
        color: color,
        draggable: true
      }
    ).setLngLat(lngLat).addTo(this.map);

    this.markers.push({color, marker});
    this.saveLocalStore();

    marker.on('dragend', () => {
      this.saveLocalStore();
    });
  }

  deleteMarker(index: number){
    this.markers[index].marker.remove();
    this.markers.splice(index,1);
  }

  flyTo(marker: Marker){
    if(!this.map) return;

    this.map?.flyTo({
      zoom: this.zoom,
      center: marker.getLngLat()
    });
  }

  saveLocalStore(){
    const plainMarkers: PlainMarker[] = this.markers.map(({color, marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    }
    );
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStora(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const planMarkers: PlainMarker[] = JSON.parse(plainMarkersString); // ¡observacion!

    planMarkers.forEach(({color, lngLat}) => {
      const [lng, lat] = lngLat;
      const coord = new LngLat(lng, lat);

      this.addMaker(coord, color);
    });
  }
}
