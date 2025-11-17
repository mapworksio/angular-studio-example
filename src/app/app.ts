import {
  AfterViewInit,
  Component,
  createComponent,
  ElementRef,
  EnvironmentInjector,
  Injector,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CustomWidget } from './custom-widget/custom-widget';

const Studio = (window as any).Studio;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  config = {
    map: 'AXBR6sWIAAA2ac12AAAA',
    mapworksPath: 'https://app.mapworks.io',
    access: Studio.core.Map.Access.ANONYMOUS,
    navigationControl: false,
    scaleControl: true,
    toolbarControl: true,
    zoomControl: false,
    mapworksLoginProvider: {
      client_id: '3mvor82v8k8f6nbi4f8bpihsom',
      popup_redirect_uri: 'http://localhost:4200/login-callback.html',
      anonymousUser: 'noreply@public-anonymous.mapworks.io',
    }
  };
  map: any;

  @ViewChild('container')
  private containerEl!: ElementRef;

  constructor(
    private injector: Injector,
    private environmentInjector: EnvironmentInjector
  ) {}

  ngAfterViewInit() {
    this.map = Studio.init(this.containerEl.nativeElement, this.config)
    .once('ready', this.prepareCustomWidget);
  }

  private prepareCustomWidget = () => {
    const toolbar = this.map.getControl('toolbar');

    const TabModel = Studio.app.component.panel.tab.Model;

    // Create custom widget container view
    const view = new Studio.Backbone.View().render();

    // Add it to toolbar
    toolbar.collection.add(
      new TabModel({
        id: 'widget',
        title: 'Widget',
        iconClass: 'glyphicon glyphicon-ice-lolly',
        view,
      }),
      { at: 3 }
    );

    view.once('show', () => {
      // Get the element to attach the view
      const { el } = view;

      const componentRef = createComponent(CustomWidget, {
        environmentInjector: this.environmentInjector,
        elementInjector: this.injector,
      });

      el.appendChild(componentRef.location.nativeElement);

      componentRef.changeDetectorRef.detectChanges();
    });
  }
}
