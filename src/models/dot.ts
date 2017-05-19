import { KLoopPlayer } from './../libs/kLoopPlayer';
import { XYLocation } from './location'

/**
 * a sound loop but with location information
 */
export interface KLoopViewModel {
  id: string;
  pos: XYLocation;
  player: KLoopPlayer;
  channel: number;
  // isEditing: boolean;
  // loopId:string;
}

