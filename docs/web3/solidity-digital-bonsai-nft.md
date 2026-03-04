---
title: 用 Solidity 写一个电子盆栽智能合约
shortTitle: 电子盆栽合约
date: 2024-02-24
categories:
  - Web3
tags:
  - Web3
  - Solidity
---

最近看到推特宠物的项目，萌生了写一个电子盆栽智能合约和植物标本NFT合约练练手的想法。

# 一、植物生长基础合约
首先我们需要提供给用户一个播种植物的方法，即创建植物的函数，还有促使植物生长的方法，即浇水，给阳光的方法。

1. 播种
2. 浇水
3. 阳光
4. 收获
5. 植物标本NFT

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1dd49c666b44168af3f23111f5c10b3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2267&h=1240&s=1078440&e=png&b=fefdfd)

## 1.1 植物基本信息
```solidity
// 植物信息
   struct PlantMetadata {
        string plantName;
        PlantSpecies plantSpecies;
    }
    
 // 植物品种
    enum PlantSpecies {
        Tree,
        Flower,
        Shrub
    }
    
   // 植物状态
    struct Plant {
        uint8 waterLevel; // 0~100
        uint8 lightLevel; // 0~100
        bool isAlive;
        PlantStage currentStage;
        PlantMetadata metadata;
    }

    // 植物生长阶段
    enum PlantStage {
        Seed,
        Sprout,
        Mature,
        Flower,
        Harvest
    }
```
 ## 1.2 播种（创建植物）
 定义一个map建立从植物id到植物信息的映射，定义植物Id计数器， 每新增一个植物则Id计数器+1

 ```solidity
  /**
     * @notice 创建植物并返回植物ID
     * @param plantName 植物名称
     * @param plantSpecies 植物品种
     */
    function createPlant(
        string memory plantName,
        PlantSpecies plantSpecies
    ) external returns (uint256) {
        uint256 plantId = _plantIds.length();

        // 创建新植物
        plantMap[plantId] = Plant({
            waterLevel: 25,
            lightLevel: 25,
            isAlive: true,
            currentStage: PlantStage.Seed,
            metadata: PlantMetadata({
                plantName: plantName,
                plantSpecies: plantSpecies
            })
        });

        // 将植物ID添加到集合中
        _plantIds.add(plantId);

        // 将植物ID添加到用户地址对应的植物ID数组中
        userPlantIds[msg.sender].push(plantId);

        return plantId;
    }
 ```

## 1.3 植物生长逻辑
```solidity
 /**
     * @notice 给植物浇水
     * @param plantId 植物ID
     * @param waterAmount 水量
     */
    function waterPlant(uint256 plantId, uint8 waterAmount) public {
        _updatePlantStatus(plantId, waterAmount, 0);
    }

    /**
     * @notice 提供光照
     * @param plantId 植物ID
     * @param lightDuration 光照时长
     */
    function provideLight(uint256 plantId, uint8 lightDuration) public {
        _updatePlantStatus(plantId, 0, lightDuration);
    }

    /**
     * @notice 合并状态更新操作，减少 gas 消耗
     * @param plantId 植物ID
     * @param waterAmount 水量
     * @param lightDuration 光照时长
     */
    function _updatePlantStatus(
        uint256 plantId,
        uint8 waterAmount,
        uint8 lightDuration
    ) internal {
        require(_plantIds.contains(plantId), "Plant does not exist");
        require(plantMap[plantId].isAlive, "The plant is not alive.");
        require(
            _isPlantOwner(msg.sender, plantId),
            "Not the owner of the plant"
        );

        // 更新水分级别
        plantMap[plantId].waterLevel = uint8(
            plantMap[plantId].waterLevel + waterAmount > 100
                ? 100
                : plantMap[plantId].waterLevel + waterAmount
        );

        // 更新光照级别
        plantMap[plantId].lightLevel = uint8(
            plantMap[plantId].lightLevel + lightDuration > 100
                ? 100
                : plantMap[plantId].lightLevel + lightDuration
        );

        // 发送事件，记录状态更新行为
        emit PlantWatered(plantId, waterAmount);
        emit LightProvided(plantId, lightDuration);

        _growPlant(plantId);
    }
```

 ## 1.4 收获植物
 植物生长到一定阶段可以收获植物，进行获取NFT、奖励发放等操作
 ```solidity
  /**
     * 收获植物
     * @param plantId plant id
     */
    function harvestPlant(uint256 plantId) public {
        require(_plantIds.contains(plantId), "Plant does not exist");
        require(plantMap[plantId].isAlive, "The plant is not alive.");
        require(
            _isPlantOwner(msg.sender, plantId),
            "Not the owner of the plant"
        );
        require(
            plantMap[plantId].currentStage == PlantStage.Flower,
            "The plant is not mature enough to harvest."
        );

        // 标记植物为已收获状态
        plantMap[plantId].currentStage = PlantStage.Harvest;
        plantMap[plantId].isAlive = false; // 将植物标记为不再存活

        // 发放奖励，例如代币或其他资源
        // 这里可以添加发放奖励的逻辑

        // 发送事件，记录植物被收获
        emit PlantHarvested(plantId, msg.sender);
    }
 ```

 # 二、植物标本NFT合约

   > ERC721 是用于创建不同属性和价值的唯一数字资产的标准，比如游戏中的角色、数字艺术品等。ERC721Enumerable 是 ERC721 的一个扩展，添加了对 NFT（非同质化代币）的枚举功能。


   NFT需要实现IERC721，安装`@openzeppelin/contracts`库，引入ERC721Enumerable合约和Ownable合约进行权限限制。
## 2.1 定义总量、单价、单次可mint最大数量并实现构造函数
```solidity
uint256 public constant MAX_SUPPLY = 2100 * (10 ** 4);
uint256 public constant PRICE = 0.01 ether;
uint256 public constant MAX_SINGLE_MINT = 10; // 单次可mint最大数量

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) Ownable(msg.sender) {}
```

## 2.2 mint铸造NFT
定义tokenId计数器`_nextTokenId`
```solidity
  /**
     * 铸造NFT
     * @param _count 铸造数量
     */
    function mint(uint256 _count) public payable returns (uint256) {
        if (_count == 0 || _count > MAX_SINGLE_MINT) {
            revert CannotMintSpecifiedNumber();
        }

        if (msg.value < _count * PRICE) {
            revert NotEnoughEtherPurchaseNFTs();
        }

        if (MAX_SUPPLY - _nextTokenId < _count) {
            revert NotEnoughNFTs();
        }

        for (uint256 i = 0; i < _count; i++) {
            _mintSingleNFT();
        }

        return _nextTokenId;
    }
    
     function _mintSingleNFT() private {
        uint256 tokenId = _nextTokenId;
        _safeMint(msg.sender, tokenId);
        _nextTokenId++;
    }
```

## 2.3 查询用户所拥有的代币

```solidity
/**
     * 查询用户所拥有的代币
     * @param _owner 拥有者
     */
    function getTokensOfOwner(
        address _owner
    ) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokenIdList = new uint256[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIdList[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokenIdList;
    }
```

 ## 设置BaseURI
 现在合约部署后可以Mint了，我们可以在OpenSea测试网可以发现合约的NFT了，但是没有图片，这个就需要设置BaseURI了。

 根据规范，需要返回实现函数_baseURI，返回URI。我这里直接使用了无聊猿的`
ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/`

 ```solidity
 string public baseTokenURI;
 
 function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }
 ```

## 完整植物标本NFT合约
```solidity
// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

/**
 * @title PlantNFT 植物标本NFT合约
 * @dev 基于 ERC721 标准
 */
contract PlantNFT is ERC721Enumerable, Ownable {
    uint256 public constant MAX_SUPPLY = 2100 * (10 ** 4);
    uint256 public constant PRICE = 0.01 ether;
    uint256 public constant MAX_SINGLE_MINT = 10; // 单次可mint最大数量

    uint256 private _nextTokenId;

    string public baseTokenURI;
    mapping(uint256 => string) private _tokenURIs;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) Ownable(msg.sender) {}

    error Unauthorized();
    error NotEnoughNFTs();
    error NotEnoughEtherPurchaseNFTs();
    error CannotMintSpecifiedNumber();
    error CannotZeroBalance();

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return string(abi.encodePacked(baseTokenURI, _tokenURIs[tokenId]));
    }

    function _mintSingleNFT() private {
        uint256 tokenId = _nextTokenId;
        _safeMint(msg.sender, tokenId);
        _nextTokenId++;
    }

    /**
     * 铸造NFT
     * @param _count 铸造数量
     */
    function mint(uint256 _count) public payable returns (uint256) {
        if (_count == 0 || _count > MAX_SINGLE_MINT) {
            revert CannotMintSpecifiedNumber();
        }

        if (msg.value < _count * PRICE) {
            revert NotEnoughEtherPurchaseNFTs();
        }

        if (MAX_SUPPLY - _nextTokenId < _count) {
            revert NotEnoughNFTs();
        }

        for (uint256 i = 0; i < _count; i++) {
            _mintSingleNFT();
        }

        return _nextTokenId;
    }

    /**
     *  预留NFT
     * @param _count 保留NFT数量
     */
    function reserveNFTs(uint256 _count) public onlyOwner {
        if (_count + _nextTokenId > MAX_SUPPLY) {
            revert NotEnoughNFTs();
        }

        for (uint256 i = 0; i < _count; i++) {
            _mintSingleNFT();
        }
    }

    /**
     * 查询用户所拥有的代币
     * @param _owner 拥有者
     */
    function getTokensOfOwner(
        address _owner
    ) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokenIdList = new uint256[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIdList[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokenIdList;
    }

    /**
     * 提取合约余额
     */
    function withdraw() external onlyOwner {
        uint256 _balance = address(this).balance;

        if (_balance <= 0) {
            revert CannotZeroBalance();
        }

        address payable ownerPayable = payable(owner());
        ownerPayable.transfer(_balance);
    }
}
```

NFT合约我是参考这篇文章 https://dev.to/rounakbanik/writing-an-nft-collectible-smart-contract-2nh8 来写的，区别就是我使用了一些新的语法，比如error错误处理，可以减少gas消耗。

# 最后
原本按我的构思是基础合约提供基本的植物公共方法，每种植物还有自己的生长特色和特点，是单独的合约，还有专门的工厂合约做管理，但是个人时间算了一下，不足以分配到这上面来了，现在简单写写，只能以后有机会再整整了。 

完整源码：https://github.com/sharebravery/web3-bloom

网站体验地址：https://we3-bloom-react.vercel.app/

*END*