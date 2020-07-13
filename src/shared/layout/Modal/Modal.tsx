import React, { Component } from "react";

import ModalHeader from "./ModalHeader/ModalHeader";
import ModalBody from "./ModalBody/ModalBody";
import ModalFooter from "./ModalFooter/ModalFooter";
import { ModalState, ModalProps } from "./Modal.model";
import "./Modal.scss";

class Modal extends Component<ModalProps, ModalState> {
  state = {
    opened: false,
    classes: ["fade", "modal"]
  };

  element: HTMLDivElement = document.createElement("div");

  blurEvent = (event: MouseEvent) => {
    if (!this.element.contains(event.target as HTMLElement)) {
      this.collapse();
    }
  };

  expand = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    this.setState({
      opened: true,
      classes: ["fade", "modal", "show"]
    });
  };

  collapse = () => {
    this.setState({
      opened: false,
      classes: ["fade", "modal"]
    });
  };

  componentDidMount() {
    window.addEventListener("click", this.blurEvent);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.blurEvent);
  }

  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#myModal"
          onClick={this.expand}
        >
          Open modal
        </button>
        <div className={this.state.classes.join(" ")} id="myModal">
          <div
            className="modal-dialog"
            ref={el => (this.element = el as HTMLDivElement)}
          >
            <div className="modal-content">
              {this.props.header ? (
                <ModalHeader collapse={this.collapse}>
                  {this.props.header}
                </ModalHeader>
              ) : null}
              <ModalBody>{this.props.body}</ModalBody>
              {this.props.footer ? (
                <ModalFooter collapse={this.collapse}>
                  {this.props.footer}
                </ModalFooter>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
