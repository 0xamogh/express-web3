pragma v0.8.7;

//adding smart contract here for reference, testing and deploys will happen in a seperate repo
contract ExpressWeb3Resolver {
    function resolve(string calldata ipfsHash) public returns (uint256 requestId){

    }

    function resolveCallback(string calldata request_id, bytes calldata data, string calldata md5, bytes calldata signature) external returns (bool verified){

    }
}