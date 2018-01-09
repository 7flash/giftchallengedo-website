import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';

export default class Token extends Component {
  constructor() {
    super();

    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    this.props.onClick(this.props.tokenId);
  }

  render() {
    return (
      <Box direction='column'>
        <span>Link: {this.props.data.link}</span>
        <span>Servant: {this.props.data.servant}</span>
        <span>Owner: {this.props.data.owner}</span>
        <span>Price: {this.props.data.price}</span>
        <span>ID: {this.props.data.tokenId}</span>
        <Button label='Buy token' onClick={this._onClick} />
      </Box>
    );
  }
}
