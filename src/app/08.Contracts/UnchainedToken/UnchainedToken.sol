// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/utils/Context.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/utils/Counters.sol";

contract UnchainedToken is Context, Ownable, ERC721 {
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;
    
    // Map the creator with the TokenURI
    mapping (uint256 => address) private _creators;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
    }


    function mintWithTokenURI(address to, string memory tokenURI) public onlyOwner {
        _mint(to, _tokenIdTracker.current());
        _setTokenURI(_tokenIdTracker.current(), tokenURI);
        _creators[_tokenIdTracker.current()] = to;
        _tokenIdTracker.increment();
    }
    function creatorOf(uint256 tokenId) public view virtual returns (address) {
        return _creators[tokenId];
    }
}
