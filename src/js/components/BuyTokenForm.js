import React, { Component } from 'react';

import Layer from 'grommet/components/Layer';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';

export default class BuyTokenForm extends Component {
  constructor() {
    super();

    this._onChangeLink = this._onChangeLink.bind(this);
    this._onChangePrice = this._onChangePrice.bind(this);

    this._onSubmit = this._onSubmit.bind(this);
    this._onClose = this._onClose.bind(this);

    this.state = {
      link: undefined,
      price: undefined
    };
  }

  _onChangeLink(event) {
    this.setState({
      link: event.target.value
    });
  }

  _onChangePrice(event) {
    this.setState({
      price: event.target.value
    });
  }

  _onSubmit() {
    this.props.onSubmit(
      this.state.link, this.state.price
    );
  }

  _onClose() {
    this.props.onClose();
  }

  render() {
    return (
      <Layer closer={true} onClose={this._onClose}>
        <Header>
          <Heading>Buy unique good deed</Heading>
        </Header>
        <Form onSubmit={this._onSubmit}>
          <FormFields>
            <fieldset>
              <FormField label='Post link' htmlFor='link'>
                <input type='text' name='link' id='link' defaultValue={this.props.token.link} onChange={this._onChangeLink} />
              </FormField>
              <FormField label='Price' htmlFor='price'>
                <input type='text' name='price' id='price' defaultValue={this.props.token.price} onChange={this._onChangePrice} />
              </FormField>
            </fieldset>
          </FormFields>
        </Form>
        <Footer>
          <Button type='submit' label='Buy token' onClick={this._onSubmit} />
        </Footer>
      </Layer>
    )
  }
}