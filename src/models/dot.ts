import {KLoop} from './kloop'

export interface DotLocation {
  x: number;
  y: number;
}

export interface Dot {
  id: number;
  pos: DotLocation;
  loop:KLoop;
}
