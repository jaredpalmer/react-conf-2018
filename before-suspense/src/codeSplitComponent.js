import React from 'react';

export function codeSplitComponent(getComponent) {
  return class LazyComponent extends React.Component {
    static Component = null;
    state = { Component: LazyComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          LazyComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}
