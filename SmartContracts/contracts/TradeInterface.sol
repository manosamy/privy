pragma solidity ^0.4.17;

import "./FactoryInterface.sol";
import "./ContractInterface.sol";

contract TradeInterface is ContractInterface {

    uint public tradeNumber;
    enum Party { Unassigned, Buyer, Seller, Broker}
    enum Field { unassigned, tradeDate, product, qty, price, buyer, seller, broker, paymentTerm}
    enum SymKey { unassigned, commonFields, paymentTerms}
    function initialize(FactoryInterface pFactory, string pGuid, address pOracleAddress, uint pTradeNumber) public;
    function updateData(bytes32 pCommonFieldsSymKeyHash, string pTradeDate, string pProduct, 
            string pQty, string pPrice) public;
    function updatePaymentInfo(bytes32 pPaymentFieldsSymKeyHash, string pPaymentTerm) public;
    function accept(bytes32 symmetricKeyHash, string signerKey) public;
    function cancel(bytes32 symmetricKeyHash) public;
}
