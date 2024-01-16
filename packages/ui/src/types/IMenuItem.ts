import { SvgIconComponent } from '@ppe/icons';

export interface IMenuItem {
  text: string;
  path?: string;
  icon?: SvgIconComponent;
  hidden?: boolean;
  subItems?: IMenuItem[];
}
