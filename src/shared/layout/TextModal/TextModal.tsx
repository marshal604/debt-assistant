import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import { TextModalProps, TextModalState } from './TextModal.model';
import { InputProps, InputType } from 'src/shared/forms/Input/Input.model';
import Input from 'src/shared/forms/Input/Input';
class TextModal extends Component<TextModalProps, TextModalState> {
  state = {
    text: ''
  };

  inputProps: InputProps<string> = {
    inputType: InputType.Input,
    label: this.props.label,
    value: this.props.value || '',
    config: {
      placeholder: this.props?.placeholder || '',
      type: 'text'
    },
    change: value => this.onTextChange(value)
  };

  onCancel() {
    if (!this.props.cancel) {
      return;
    }
    this.props.cancel();
  }

  onConfirm() {
    if (!this.props.confirm) {
      return;
    }
    this.props.confirm(this.state.text);
  }

  onTextChange(value: string) {
    if (this.props.change) {
      this.props.change(value);
    }
    this.setState({
      text: value
    });
  }

  render() {
    return (
      <Modal
        buttonName={this.props.buttonName}
        disabled={this.props.disabled}
        header={this.props.title}
        useHeader={!!this.props.title}
        useFooter={true}
        useCancel={true}
        cancel={() => this.onCancel()}
        confirm={() => this.onConfirm()}
      >
        <div className="row">
          <div className="col-12">
            <Input {...this.inputProps}></Input>
          </div>
        </div>
      </Modal>
    );
  }
}

export default TextModal;
