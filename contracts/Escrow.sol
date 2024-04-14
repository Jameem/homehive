//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

interface IERC721 {
    function transferFrom(address _from, address _to, uint256 _id) external;
}

contract Escrow {
    address public nftAddress;
    address payable public seller;
    address public lender;
    address public inspector;

    modifier onlySeller() {
        require(msg.sender == seller, "Only seller can call this method");
        _;
    }

    mapping(uint256=>bool) public isListed;
    mapping(uint256=>uint256) public purchasePrice;
    mapping(uint256=>uint256) public escrowAmount;
    mapping(uint256=>address) public buyer;

    constructor(
        address _nftAddress,
        address payable _seller,
        address _inspector,
        address _lender
    ) {
        nftAddress = _nftAddress;
        seller = _seller;
        lender = _lender;
        inspector = _inspector;
    }

    function list(uint256 _nftId, address _buyer, uint256 _purchasePrice, uint256 _escrowAmount) public payable onlySeller {
        // Transfer NFT from seller to this contract
        IERC721(nftAddress).transferFrom(msg.sender, address(this), _nftId);

        isListed[_nftId] = true;
        purchasePrice[_nftId]= _purchasePrice;
        buyer[_nftId]= _buyer;
        escrowAmount[_nftId]= _escrowAmount;
    }
}
