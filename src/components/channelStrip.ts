import { autoinject, inject } from 'aurelia-dependency-injection';
import { KomposerChannel } from '../libs/komposerChannel';
import { bindable } from 'aurelia-framework';

// @autoinject()
@inject(Element)
export class ChannelStripCustomElement {

  @bindable()
  channel: KomposerChannel;
  @bindable()
  isCurrent: boolean;

  constructor(private element: HTMLElement) {

  }

  toggleAuto(channel: KomposerChannel) {
    this.channel.autoPlayerData.on = !this.channel.autoPlayerData.on;
    if (!this.channel.autoPlayerData.on) this.channel.allOff();
  }


  selectClick() {
    this.element.dispatchEvent(
      new CustomEvent("on-select", {
        bubbles: true,
      })
    );
  }


}
