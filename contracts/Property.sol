//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract Property is ERC721URIStorage {
    uint256 private _tokenIdCounter;

    constructor() ERC721("Property", "HHV") {}

    function mint() public returns (uint256) {

        uint256 tokenId = _tokenIdCounter;

        _mint(msg.sender, tokenId);


        _setTokenURI(tokenId, Strings.toString(tokenId));

        _tokenIdCounter += 1;

        return tokenId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
}
