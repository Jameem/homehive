//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";


contract Property is ERC721URIStorage {
    uint256 private _tokenIdCounter=0;

    constructor() ERC721("Property", "HHV") {}

    function mint(string memory tokenURI) public returns (uint256) {

        _tokenIdCounter += 1;

        uint256 tokenId = _tokenIdCounter;

        _mint(msg.sender, tokenId);

        _setTokenURI(tokenId, tokenURI);


        return tokenId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }

    function getTokenURI(uint256 tokenId) public view returns(string memory) {
        return tokenURI(tokenId);
    }
    
}
