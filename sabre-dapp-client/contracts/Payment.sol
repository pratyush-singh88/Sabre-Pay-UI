pragma solidity >=0.4.21 <0.6.0;

contract Payment {
  address payable transferFrom;
  address payable transferTo;
  uint paymentAmount;
 
  constructor() public {
    transferFrom = msg.sender;
  }
 
  event TransferFund(address payable _transferTo, address payable _transferFrom, uint amount);
 
  function transferFund(address payable _transferTo) public payable returns (bool){
      transferTo = _transferTo;
      transferTo.transfer(msg.value);
  
      emit TransferFund(transferTo, transferFrom, msg.value);
 
      return true;
  }
 
  function getBalanceOfCurrentAccount() public payable returns (uint) {
    return transferFrom.balance;
  }
 
}
