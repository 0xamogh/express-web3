const Web3 = require('web3')
const md5 = require('md5');
const { create } = require('ipfs-http-client')
var web3 = new Web3();

var pk;
const ipfs = create('ipfs.infura.io', '5001', {protocol: 'https'})

function accessLog(req, res, next) {
  const { hostname, method, path, ip, protocol } = req;
  console.log(`ACCESS: ${method} ${protocol}://${hostname}${path} - ${ip}`);
  next();
}

function errorLog(err, req, res, next) {
  const { hostname, method, path, protocol } = req;
  console.log(`ERROR: ${method} ${protocol}://${hostname}${path} - ${err}`);
  // next(); // you can call either next or send a uniform error response
  res.status(500).send({ status: "server-error", message: err.message });
}

function web3api(req, res, next){
    // does all 5 functions for the request
}

function configureWeb3(privateKey){
    // probably should encrypt this somehow
    pk = privateKey;
}


function generateMD5Hash(response){
    return md5(response);
}

// should have checks for correct length of pk and verify that it is a good pk
function signatureThatSignsMD5Hash(req, res, next){
    //check config 
    if(pk != null){
        // have to understnad structure of response object
        const [message, messagHash, v,r ,s , signature] = web3.eth.accounts.sign(res.something, pk);
    } else {
        res.status(500).send({status: 'server-error', message: 'express-web3 is not correctly configured'})
    }
}

async function uploadToIPFS(data){
    try {
        const { cid } = ipfs.add(data); 
    } catch (err) {
        console.log('Upload to IPFS failed', err);
    }

    return cid;
}

module.exports = { accessLog, errorLog, web3api, configureWeb3 };