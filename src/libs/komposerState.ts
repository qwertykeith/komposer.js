import { DotGroup } from './dotGroup';
/**
 * represents the state of the whole app
 */
export class KomposerAppState {
  data: KomposerState;
  display: KomposerDisplayState;
}

/**
 * state of the engine
 */
export class KomposerState {

  tempo: number;

}

/**
 * just the display
 */
export class KomposerDisplayState {

  currentDotGroupId: string;
  dotGroups: DotGroup[] = [];

}
