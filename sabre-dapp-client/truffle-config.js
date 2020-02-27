
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
require('babel-register')
module.exports = {
  networks: {
    ganache: {
      host: 'localhost',
      port: 7545,
      network_id: '*' // Match any network id
    },
	development: {
		provider: function() {
			return new HDWalletProvider(privKeys, "0xd737b836064339e1230cf43e6d0892d15df9f7ad");
		},
		network_id: '*',
		gas: 4700000
	}
  }};
