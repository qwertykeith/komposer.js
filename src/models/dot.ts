import { KLoop } from './kloop'
import { DotLocation } from './location'

/**
 * a sound loop but with location information
 */
export interface Dot {
  id: number;
  pos: DotLocation;
  loop: KLoop;
}
