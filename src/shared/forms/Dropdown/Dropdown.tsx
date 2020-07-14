import React, { Component } from 'react';
import { DropdownProps, DropdownState } from './Dropdown.model';
import './Dropdown.scss';
class Dropdown extends Component<DropdownProps, DropdownState> {
  state = {
    opened: false
  };
  element: HTMLDivElement = document.createElement('div');

  blurEvent = (event: MouseEvent) => {
    if (!this.element.contains(event.target as HTMLElement)) {
      this.collapse();
    }
  };

  expand = () => {
    this.setState({
      opened: true
    });
  };

  collapse = () => {
    this.setState({
      opened: false
    });
  };

  componentDidMount() {
    window.addEventListener('click', this.blurEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.blurEvent);
  }

  render() {
    return (
      <div className="Dropdown dropdown" ref={el => (this.element = el as HTMLDivElement)}>
        <button type="button" onClick={this.expand} className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
          {this.props.children}
        </button>
        <div className={this.state.opened ? 'show dropdown-menu' : 'dropdown-menu'}>
          {this.props.options.map(item => (
            <div
              key={item.id}
              className="dropdown-item"
              onClick={() => {
                this.props.change(item);
                this.collapse();
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Dropdown;
