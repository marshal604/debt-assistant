import React, { Component } from 'react';
import { MultiSelectProps, MultiSelectState } from './MultiSelect.model';
import './MultiSelect.scss';
import { OptionItem } from 'src/shared/forms/forms.model';
class MultiSelect extends Component<MultiSelectProps, MultiSelectState> {
  state = {
    opened: false
  };
  element: HTMLDivElement = document.createElement('div');

  blurEvent = (event: MouseEvent) => {
    if (!this.element.contains(event.target as HTMLElement)) {
      this.collapse();
    }
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>, item: OptionItem<any>) => {
    if (this.props.change) {
      this.props.change(
        event.target.checked ? (this.props.selected || []).concat(item.id) : (this.props.selected || []).filter(id => id !== item.id)
      );
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

  isBoundingRight = (): boolean => {
    return window.innerWidth - this.element.getBoundingClientRect().right < 100;
  };

  render() {
    return (
      <div className="MultiSelect dropdown" ref={el => (this.element = el as HTMLDivElement)}>
        {this.props.label ? <div className="mb-2">{this.props.label}</div> : null}
        <button
          type="button"
          onClick={this.expand}
          className="btn btn-primary dropdown-toggle d-flex align-items-center"
          data-toggle="dropdown"
        >
          {this.props.selected ? (
            <div>
              {this.props.options.find(item => this.props.selected?.includes(item.id))?.name}{' '}
              {this.props.selected.length > 1 ? `+${this.props.selected.length - 1} others` : ''}
            </div>
          ) : (
            this.props.children
          )}
        </button>
        <div
          className={[
            this.state.opened ? 'show dropdown-menu' : 'dropdown-menu',
            this.isBoundingRight() ? 'dropdown-menu-align-right' : null
          ].join(' ')}
        >
          {this.props.customized
            ? this.props.customBody
            : this.props.options.map((item: OptionItem<any>) => (
                <label htmlFor={item.id} key={item.id} className="dropdown-item d-flex align-items-center mt-0">
                  <input
                    onChange={event => this.onChange(event, item)}
                    id={item.id}
                    checked={this.props.selected?.includes(item.id)}
                    type="checkbox"
                  />
                  <div className="ml-2">{item.name}</div>
                </label>
              ))}
        </div>
      </div>
    );
  }
}

export default MultiSelect;
