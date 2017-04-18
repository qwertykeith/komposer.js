import { KLoop } from './kloop'
import { XYLocation } from './location'

/**
 * a sound loop but with location information
 */
export interface KLoopView {
  id: string;
  pos: XYLocation;
  loop: KLoop;
  // loopId:string;
}

