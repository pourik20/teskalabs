import { Module } from 'asab_webui_components';

import { TableScreen } from './TableScreen.jsx';
import { DetailScreen } from './DetailScreen.jsx';
import { RickAndMortyScreen } from './RickAndMortyScreen.jsx';

export default class TableApplicationModule extends Module {
  constructor(app, name) {
    super(app, 'TableApplicationModule');

    app.Router.addRoute({
      path: '/',
      end: false,
      name: 'Table',
      component: TableScreen,
    });

    app.Router.addRoute({
      path: '/detail/:id',
      end: false,
      name: 'Detail',
      component: DetailScreen,
    });

    app.Router.addRoute({
      path: '/rick-and-morty',
      end: false,
      name: 'Rick and Morty',
      component: RickAndMortyScreen,
    });

    app.Navigation.addItem({
      name: 'Table',
      icon: 'bi bi-table',
      url: '/',
    });

    app.Navigation.addItem({
      name: 'Rick and Morty',
      icon: 'bi bi-stars',
      url: '/rick-and-morty',
    });
  }
}
