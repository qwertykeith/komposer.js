import {KLoop} from './kloop'
import {Location} from './location'

export interface Dot {
  id: number;
  pos: Location;
  loop:KLoop;
}
