import contract from 'truffle-contract';

import GiftTokenABI from './abi/CharityToken';
import GiftChallengeABI from './abi/GiftChallenge';

const token = contract(GiftTokenABI);
const challenge = contract(GiftChallengeABI);
const web3 = window.web3;

if (web3) {
  token.setProvider(web3.currentProvider);
  challenge.setProvider(web3.currentProvider);
}

const API = {
  createToken: (servant, link) => {
    return challenge.deployed().then(instance => {
      return instance.createToken(servant, link, { from: web3.eth.accounts[0], gas: 300000 });
    });
  },

  buyToken: (link, price) => {
    return challenge.deployed().then(instance => {
      return instance.buyToken(link, { from: web3.eth.accounts[0], value: price, gas: 300000 });
    });
  },

  findTokens: () => {
    let tokenInstance;

    return token.deployed().then(instance => {
      tokenInstance = instance;

      return instance.totalSupply.call();
    }).then(endIndex => {
      const startIndex = 0;
      const links = [];

      for (let tokenId = startIndex; tokenId < endIndex; tokenId++) {
        const promise = tokenInstance.tokenMetadata.call(tokenId);
        links.push(promise);
      }

      return Promise.all(links);
    }).then(links => {
      const tokens = links.map((link) => {
        return API.findToken(link);
      });

      return Promise.all(tokens);
    });
  },

  findToken: link => {
    return challenge.deployed().then(instance => {
      return Promise.all([
        instance.getOwner.call(link),
        instance.getServant.call(link),
        instance.getPrice.call(link),
        instance.getToken.call(link)
      ]).then((results) => {
        return {
          owner: results[0],
          servant: results[1],
          price: results[2].toNumber(),
          tokenId: results[3].toNumber(),
          link: link
        };
      });
    });
  },

  getBalance: address => new Promise((resolve, reject) => {
    return web3.eth.getBalance(address, (err, res) => {
      if (err) return reject({message: err, arg: address});

      resolve(res);
    });
  }),

  getTokenBalance: () => {
    return token.deployed().then(instance => {
      return instance.balanceOf(web3.eth.accounts[0]);
    });
  }
};

export default API;

