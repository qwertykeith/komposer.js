import { KLoop } from './kloop'
import { DotLocation } from './location'

/**
 * a sound loop but with location information
 */
export interface Dot {
  id: string;
  pos: DotLocation;
  // loop: KLoop;
  loopId:string;
}
