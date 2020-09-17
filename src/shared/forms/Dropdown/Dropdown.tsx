import React, { Component } from 'react';
import { DropdownProps, DropdownState } from './Dropdown.model';
import './Dropdown.scss';
import { OptionItem } from 'src/shared/forms/forms.model';
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

  onChange = (item: OptionItem<any>) => {
    if (this.props.change) {
      this.props.change(item);
    }
    this.collapse();
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
        {this.props.label ? <div className="mb-2">{this.props.label}</div> : null}
        <button
          type="button"
          onClick={this.expand}
          className="btn btn-primary dropdown-toggle d-flex align-items-center"
          data-toggle="dropdown"
        >
          {this.props.selected ? <div>{this.props.options.find(item => item.id === this.props.selected)?.name}</div> : this.props.children}
        </button>
        <div className={this.state.opened ? 'show dropdown-menu' : 'dropdown-menu'}>
          {this.props.options.map(item => (
            <div key={item.id} className="dropdown-item" onClick={() => this.onChange(item)}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Dropdown;
