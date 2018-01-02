import React, { Component } from 'react'
import ChallengeContract from '../build/contracts/GiftChallenge.json'
import getWeb3 from './utils/getWeb3'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { default as contract } from 'truffle-contract'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			link: "vk.com/userid/postid",
			account: "",
			servant: "",
			tokenOwner: "",
			amount: 0,
			web3: null,
			challenge: null
		}
	}

	componentWillMount() {
		getWeb3.then(results => {
			this.setState({
				web3: results.web3
			})

			this.instantiateContract()
		}).catch(console.error)
	}

	instantiateContract() {
		this.setState({
			challenge: contract(ChallengeContract)
		})
		this.state.challenge.setProvider(this.state.web3.currentProvider)

		this.state.web3.eth.getAccounts((eth, accounts) => {
			this.setState({
				account: accounts[0],
				servant: accounts[0]
			})
		})

		this.refreshTokenOwner()
	}

	refreshTokenOwner = () => {
		this.state.challenge.deployed().then((instance) => {
			return instance.getOwner.call(this.state.link)
		}).then((result) => {
			this.setState({
				tokenOwner: result
			})
		})
	}

	createToken = () => {
		let challengeInstance
		let link = this.state.link

		this.state.challenge.deployed().then(instance => {
			challengeInstance = instance

			return challengeInstance.createToken(this.state.servant, link, {from: this.state.account, gas: 300000})
		}).then(() => {
			return challengeInstance.getOwner.call(link)
		}).then(this.refreshTokenOwner).catch(console.error)
	}

	buyToken = () => {
		let challengeInstance
		let link = this.state.link
		let amount = this.state.amount

		this.state.challenge.deployed().then(instance => {
			challengeInstance = instance

			return challengeInstance.buyToken(link, {from: this.state.account, value: amount, gas: 300000})
		}).then(() => {
			return challengeInstance.getOwner.call(link)
		}).then(this.refreshTokenOwner).catch(console.error)
	}

	changeLinkHandler = (event) => {
		this.setState({
			link: event.target.value
		})
	}

	changeServantHandler = (event) => {
		this.setState({
			servant: event.target.value
		})
	}

	changeAmountHandler = (event) => {
		this.setState({
			amount: event.target.value
		})
	}

	render() {
		return (
			<MuiThemeProvider>
				<div>
					<p>Owner of created token: {this.state.tokenOwner}</p>
					<div>
					<TextField hintText="Post link" value={this.state.link} onChange={this.changeLinkHandler} />
					<TextField hintText="Servant address" value={this.state.servant} onChange={this.changeServantHandler} />
					<RaisedButton onClick={this.createToken} label="Create Token" />
					</div>
					<div>
						<TextField hintText="Post link" value={this.state.link} onChange={this.changeLinkHandler} />
						<TextField hintText="Amount" value={this.state.amount} onChange={this.changeAmountHandler} />
						<RaisedButton onClick={this.buyToken} label="Buy Token" />
					</div>
				</div>
			</MuiThemeProvider>
		)
	}
}

export default App