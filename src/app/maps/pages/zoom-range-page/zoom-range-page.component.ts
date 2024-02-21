import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {LngLat, Map} from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{


  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;

  public currentCenter?: LngLat = new LngLat(-78.56882144987574, -9.081839275259867);


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

    this.mapListener();
  }

  mapListener(){
    if(!this.map) throw 'Mapa sin inicializar';
    this.map.on('zoom',(ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend',() => {
      if(this.map!.getZoom() < 22) return;
      this.map!.zoomTo(22)
    });

    this.map.on('move',() => {
      this.currentCenter = this.map?.getCenter();
    });

  }

  parseValue(value: string): number{
    console.log(value," conviritn")

    return Number.parseInt(value);
  }

  changeZoom(value: string = 'in'){

      switch(value){
        case 'in':
          this.map?.zoomIn();
          break;
        case 'out':
          this.map?.zoomOut();
      }
      if(!isNaN(Number(value))) {
        this.zoom = Number(value);
        this.map?.setZoom(this.zoom);
      }

      //this.map?.setZoom(this.zoom);
  }

  ngOnDestroy(): void {
      this.map?.remove();
  }
}
