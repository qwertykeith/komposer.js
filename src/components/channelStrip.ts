import { autoinject, inject } from 'aurelia-dependency-injection';
import { KomposerChannel } from '../libs/komposerChannel';
import { bindable } from 'aurelia-framework';
import { GenerateRandomCommand } from "../libs/commands/generateRandom";

// @autoinject()
@inject(Element, GenerateRandomCommand)
export class ChannelStripCustomElement {

  @bindable()
  channel: KomposerChannel;
  @bindable()
  isCurrent: boolean;

  showTick: boolean;
  c: boolean;

  constructor(
    private element: HTMLElement,
    private generateRandomCommand: GenerateRandomCommand) {

  }

  channelChanged(newLoop: KomposerChannel, oldLoop: KomposerChannel) {
    if (oldLoop != newLoop) {

      const me = this;

      let lastTimeout: any = null;

      this.channel.listen(() => {
        // debugger;
        clearTimeout(lastTimeout);
        me.showTick = true;

        lastTimeout = setTimeout(() => {
          me.showTick = false
        }, 20);
      });

    }
  }


  toggleAuto() {
    this.channel.autoPlayerData.on = !this.channel.autoPlayerData.on;
    if (!this.channel.autoPlayerData.on) this.channel.allOff();
  }

  random() {
    this.generateRandomCommand.execute(this.channel);
  }

  selectClick() {
    this.element.dispatchEvent(
      new CustomEvent("on-select", {
        bubbles: true,
      })
    );
  }


}
