import React, { Component } from 'react';

import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';

import Dashboard from './components/Dashboard';

export default class Gift extends Component {
  render() {
    return (
      <App>
        <Box>
          <Header>
            <Title>Gift Challenge</Title>
          </Header>
          <Dashboard />
          <Footer>
            <p>GIFT provides two ways to help people. If you want to invest money, you can buy token that you like. If you have time you can make gift, create token and get your money back</p>
          </Footer>
        </Box>
      </App>
    )
  }
}