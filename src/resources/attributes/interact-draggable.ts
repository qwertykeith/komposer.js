// source: http://davismj.me/blog/aurelia-drag-and-drop/
// https://github.com/Ullfis/interact.js-aurelia-typescript-webpack

import { inject, bindable, bindingMode } from 'aurelia-framework';

import { Location } from '../../models/location';
import { Dot } from '../../models/dot';

// import * as interact from "interact.js";
const interact = require('interact.js');

@inject(Element)
export class InteractDraggableCustomAttribute {

  // we make options bindable, so that the interact draggable options can be customized declaratively
  //@bindable({ defaultBindingMode: bindingMode.oneTime }) options;

  @bindable()
  position: Location;

  constructor(private element: HTMLElement) { }


  attached() {


    this.dispatch('locationchange', this.position);


    console.log(this.position);

    console.log('options');

    const defaultOptions = {
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      // enable autoScroll
      autoScroll: true,
    };

    this.element.onmouseover = (event) => {
      console.log('pppp');
      console.log(this.position);
      //      debugger;
      this.dispatch('interact-mouseover', event);

    }

    this.element.onmousedown = (event) => {
      this.dispatch('interact-mousedown', event);
    }

    this.element.ontouchstart = (event) => {
      this.dispatch('interact-mousedown', event);
    }

    this.element.onmouseleave = (event) => {
      this.dispatch('interact-mouseleave', event);
    }

    this.element.ontouchend = (event) => {
      this.dispatch('interact-mouseleave', event);
    }

    this.element.onmouseup = (event) => {
      this.dispatch('interact-onmouseup', event);
    }

    this.element.onmouseenter = (event) => {
      this.dispatch('interact-onmouseenter', event);
    }


    interact(this.element)
      // we can set default options if we want, overriding any options that were passed in
      .draggable(Object.assign({}, defaultOptions))
      // for each event, we dispatch an bubbling, HTML5 CustomEvent, which the aurelia
      // binding engine will be able to listen for
      .on('dragstart', (event) => this.dispatch('interact-dragstart', event))
      .on('dragmove', (event) => this.dispatch('interact-dragmove', event))
      .on('draginertiastart', (event) => this.dispatch('interact-draginertiastart', event))
      .on('dragend', (event) => this.dispatch('interact-dragend', event));

  }

  dispatch(name, data) {
    this.element.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        detail: data
      })
    );
  }
}

// interact.js events
// interact.js provides a number of different events, including resize and rotation events.
// Today, we’re just going to look at the draggable event. In order to make an element draggable,
// we wrap the element as an interact object and call draggable() on it, and configure some event handlers.
//
// interact('.draggable')
//   .draggable()
//   .on('dragstart', ondragstart)
//   .on('dragmove', ondragmove)
//   .on('draginertiastart', ondraginertiastart)
//   .on('dragend', ondragend);
// });

// The event handlers will be called on their respective events and passed an InteractEvent object.
//
// class InteractEvent {
//   target // The element that is being interacted with
//   interactable // The Interactable that is being interacted with
//   interaction // The Interaction that the event belongs to
//   x0, y0 // Page x and y coordinates of the starting event
//   clientX0, clientY0 // Client x and y coordinates of the starting event
//   dx, dy // Change in coordinates of the mouse/touch
//   velocityX, velocityY // The Velocity of the pointer
//   speed // The speed of the pointer
//   timeStamp // The time of creation of the event object
// }
