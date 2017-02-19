import {KLoop} from './kloop'
import {DotLocation} from './location'

export interface Dot {
  id: number;
  pos: DotLocation;
  loop:KLoop;
}
