import { Tree } from '../../trees/entities/tree.entity';

export class Inspection {
  id: number;
  inspectionDate: string;
  condition: string;
  comment: string;
  tree: Tree;
}
