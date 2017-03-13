import { KLoop } from '../models/kloop';
import { DotLocation } from './../models/location';

/**
 * a sound loop but with location information
 */
export interface DotViewModel {
  pos: DotLocation;
  loop: KLoop;
}
