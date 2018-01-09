import React, { Component } from 'react';

import Layer from 'grommet/components/Layer';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';

export default class CreateTokenForm extends Component {
  constructor() {
    super();

    this.state = {
      servant: undefined,
      link: undefined
    }

    this._onChangeServant = this._onChangeServant.bind(this);
    this._onChangeLink = this._onChangeLink.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onClose = this._onClose.bind(this);
  }

  _onChangeServant(event) {
    this.setState({
      servant: event.target.value
    })
  }

  _onChangeLink(event) {
    this.setState({
      link: event.target.value
    })
  }

  _onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(
      this.state.servant, this.state.link
    )
  }

  _onClose() {
    this.props.onClose();
  }

  render() {
    return (
      <Layer closer={true} onClose={this._onClose}>
        <Header>
          <Heading>Connect given gift to unique token</Heading>
        </Header>
        <Form onSubmit={this._onSubmit}>
          <FormFields>
            <fieldset>
              <FormField label='Servant' htmlFor='servant'>
                <input type='text' name='servant' id='servant' value={this.state.servant} onChange={this._onChangeServant} />
              </FormField>
              <FormField label='Post link' htmlFor='post'>
                <input type='text' name='link' id='link' value={this.state.link} onChange={this._onChangeLink} />
              </FormField>
            </fieldset>
          </FormFields>
        </Form>
        <Footer>
          <Button type='submit' label='Create Token' onClick={this._onSubmit} />
        </Footer>
      </Layer>
    )
  }
}