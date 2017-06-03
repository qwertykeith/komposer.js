import { AutoPlayer } from './../libs/autoPlayer';
import { bindable, inject } from 'aurelia-framework';

@inject(Element)
export class AutoplayerCustomElement {

  @bindable()
  autoPlayer: AutoPlayer;

  constructor(private element: HTMLElement) {

  }

  // autoClick() {
  //   this.element.dispatchEvent(
  //     new CustomEvent("on-auto-toggle", {
  //       bubbles: true,
  //     })
  //   );
  // }

}
