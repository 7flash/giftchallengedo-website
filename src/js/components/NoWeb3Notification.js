import React, { Component } from 'react';

export default class NoWeb3Notification extends Component {
  render() {
    return (
      <div>
        <p>
          No Ethereum network provider is detected.
          There are several ways to fix this:
        </p>
        <ul>
          <li>install <a href="https://metamask.io">MetaMask</a> browser plugin</li>
          <li>install <a href="https://github.com/ethcore/parity-extension">Parity</a> browser plugin</li>
          <li>open this page in <a href="https://github.com/ethereum/mist/releases">Mist</a> browser</li>
        </ul>
        <p>
          Find more info on this project on <a href="https://github.com/sonm-io/token">github</a>.
        </p>
      </div>
    )
  }
}