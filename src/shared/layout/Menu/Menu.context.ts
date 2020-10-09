import React, { Context } from 'react';

interface MenuContextModel {
  opened: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const MenuContext: Context<MenuContextModel> = React.createContext<MenuContextModel>({
  opened: false,
  open: () => {},
  close: () => {},
  toggle: () => {}
});

export default MenuContext;
