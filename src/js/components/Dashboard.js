import React, { Component } from 'react';

import API from '../API';

import NoWeb3Notification from './NoWeb3Notification';
import CreateTokenForm from './CreateTokenForm';
import BuyTokenForm from './BuyTokenForm';
import Token from './Token';

import Section from 'grommet/components/Section';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Spinner from 'grommet/components/icons/Spinning'

export default class Dashboard extends Component {
  constructor() {
    super();

    this._showCreateTokenForm = this._showCreateTokenForm.bind(this);
    this._showBuyTokenForm = this._showBuyTokenForm.bind(this);
    this._hideCreateTokenForm = this._hideCreateTokenForm.bind(this);
    this._hideBuyTokenForm = this._hideBuyTokenForm.bind(this);

    this._createToken = this._createToken.bind(this);
    this._buyToken = this._buyToken.bind(this);

    this.state = {
      tokens: [],
      showCreateTokenForm: false,
      showBuyTokenForm: false,
      currentToken: undefined
    };
  }

  componentDidMount() {
    this._updateTokens();
  }

  _showCreateTokenForm() {
    this.setState({ showCreateTokenForm: true })
  }

  _showBuyTokenForm(tokenId) {
    this.setState({ showBuyTokenForm: true, currentToken: this.state.tokens[tokenId] })
  }

  _hideCreateTokenForm() {
    this.setState({ showCreateTokenForm: false })
  }

  _hideBuyTokenForm() {
    this.setState({ showBuyTokenForm: false })
  }

  _createToken(servant, link) {
    API.createToken(servant, link).then(this._updateTokens);
  }

  _buyToken(link, price) {
    API.buyToken(link, price).then(this._updateTokens);
  }

  _updateTokens() {
    API.findTokens().then(tokens => {
      this.setState({
        tokens
      });
    });
  }

  render() {
    if (!window.web3) {
      return <NoWeb3Notification />
    }

    const spinner = <Spinner size='large' />
    const createTokenForm = this.state.showCreateTokenForm ? <CreateTokenForm onClose={this._hideCreateTokenForm} onSubmit={this._createToken} /> : undefined;
    const buyTokenForm = this.state.showBuyTokenForm ? <BuyTokenForm onClose={this._hideBuyTokenForm} onSubmit={this._buyToken} token={this.state.currentToken} /> : undefined;

    const tokens = this.state.tokens.map((item, index) => {
      return (
        <ListItem key={`token-${index}`} separator='horizontal'>
          <Token data={item} tokenId={index} onClick={this._showBuyTokenForm} />
        </ListItem>
      )
    });

    return (
      <Section>
        {tokens && tokens.length > 0 ?
          <Box>
            <Header><Heading>Tokens list</Heading></Header>
            <List>
              {tokens}
            </List>
            <Footer>
              <Button label='Create token' onClick={this._showCreateTokenForm} />
            </Footer>
          </Box>
          : spinner }
        {createTokenForm}
        {buyTokenForm}
      </Section>
    )
  }
}