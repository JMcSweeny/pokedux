import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';

export default function (ChildComponent, containerId, offset) {
  class LazyLoad extends Component {
    constructor(props) {
      super(props);

      this.state = {
        visible: false
      }

      this.onScroll = debounce(this.onScroll.bind(this), 50);
    }

    componentDidMount() {
      this.container = document.getElementById(containerId) || window;
      this.addListeners();
      this.isVisible();
    }

    componentWillReceiveProps(nextProps) {
      this.onScroll();
    }

    componentWillUnmount() {
      this.removeListeners();
    }

    addListeners() {
      this.container.addEventListener('scroll', this.onScroll);
    }

    removeListeners() {
      this.container.removeEventListener('scroll', this.onScroll);
    }

    elementIsInView(element) {
      const rect = element.getBoundingClientRect();

      const scrollTop = this.container.scrollTop;
      const elementTop = rect.top + scrollTop;
      const elementHeight = rect.bottom - rect.top;
      const windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;

      return (
        elementTop < (windowInnerHeight + scrollTop + offset) &&
        scrollTop < (elementHeight + elementTop + offset)
      );
    }

    isVisible() {
      const element = ReactDOM.findDOMNode(this);

      if (this.elementIsInView(element)) {

        this.setState({
          visible: true
        });

        this.removeListeners();
      }
    }

    onScroll() {
      this.isVisible();
    }

    render() {
      return (
        <ChildComponent {...this.props} visible={this.state.visible} />
      );
    }
  }

  return LazyLoad;
}