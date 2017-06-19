'use strict';

import ListView from './listView';

export default class List {
  constructor(items) {
    this.items = items;
  }

  buildView() {
    this.view = new ListView(this.items);
  }

  render() {
    this.buildView();
  }
}