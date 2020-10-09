import React, { Component, FunctionComponent } from 'react';
import { MenuProps } from './Menu.model';
import MenuContext from './Menu.context';
export const MenuHoc = (WrapComponent: FunctionComponent<MenuProps>) => {
  return class extends Component<MenuProps, MenuProps> {
    state = {
      opened: !!this.props.opened,
      list: this.props.list,
      brandUrl: this.props.brandUrl
    };

    open = () => {
      this.setState({
        opened: true
      });
    };

    close = () => {
      this.setState({
        opened: false
      });
    };

    toggle = () => {
      this.setState({
        opened: !this.state.opened
      });
    };

    render() {
      return (
        <MenuContext.Provider
          value={{ opened: this.state.opened, open: () => this.open(), close: () => this.close(), toggle: () => this.toggle() }}
        >
          {this.props.children}
          <WrapComponent {...this.state}></WrapComponent>
        </MenuContext.Provider>
      );
    }
  };
};
