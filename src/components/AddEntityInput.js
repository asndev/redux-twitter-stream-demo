import React, { Component, PropTypes } from 'react';

export default class AddEntityInput extends Component {
  static propTypes = {
    addCallbackFn: PropTypes.func.isRequired
  }

  render() {
    return (
      <input
        type='text'
        className={'form-control'}
        placeholder='What do you want to add?'
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleSubmit.bind(this)} />
    );
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.value || '',
    };
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    const value = e.target.value.trim();
    if (e.which === 13) {
      this.props.addCallbackFn(value);
      this.setState({value: ''});
    }
  }

}
