export interface MenuItemI {
  name: string;
  icon: string;
  url: string;
  children?: MenuItemI[]
}