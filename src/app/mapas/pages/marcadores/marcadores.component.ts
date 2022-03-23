import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor{
  color: string;
  marker: mapboxgl.Marker;
}


@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-3.8132679314591855,43.45644490830871];
  marcadores: MarcadorColor[] = [];


  constructor() { }
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';


    // const marker = new mapboxgl.Marker()
    // .setLngLat(this.center).addTo(this.mapa)

  }

  irMarcador(marcador: mapboxgl.Marker){
    this.mapa.flyTo({
      center: marcador.getLngLat()
    });
    
    
    
    
  }

  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
    .setLngLat(this.center)
    .addTo(this.mapa);

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });
    this.guardarMarcadoresLocalStorage(nuevoMarcador);
  }

  guardarMarcadoresLocalStorage(nuevoMarcador: mapboxgl.Marker){
    localStorage.setItem(JSON.stringify(nuevoMarcador.getLngLat()), JSON.stringify(nuevoMarcador))


  }

  leerMarcadoresLocalStorage(){

  }

}
