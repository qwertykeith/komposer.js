import { Dot } from './../models/dot';

/**
 * groups lists of loops togther
 */
export class DotGroup {
  guid: String;
  name: string;
  dots: Dot[] = [];
  autoPlay: boolean;
}
