import { Component } from '@angular/core';


interface MenuItem{
  name: string;
  route: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    {name: 'full-Screen', route: '/maps/fullscreen'},
    {name: 'zoom-range', route: '/maps/zoom-range'},
    {name: 'markers', route: '/maps/markers'},
    {name: 'Houses', route: '/maps/properties'},
  ];
}
