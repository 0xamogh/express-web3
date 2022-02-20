const Web3 = require('web3')
const md5 = require('md5');
const { create } = require('ipfs-http-client');
const { is } = require('express/lib/request');
var web3 = new Web3();

var pk;
const ipfs = create('https://ipfs.io')

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

async function web3api(req, res, next){

    // does all 5 functions for the request
    const md5 = generateMD5Hash(res);
    const sign = signMD5Hash(md5);
    res.setHeader('MD5Hash', md5);
    res.setHeader('Web3Signature', sign); 
    // confirm if the md5 or the actual data is to be uploaded
    if(res.isPrivate){
        const cid = await uploadToIPFS(md5)
        res.setHeader('IPFS-CID', cid);
    }

    next()
}

function configureWeb3(privateKey){
    // probably should encrypt this somehow
    pk = privateKey;
}


function generateMD5Hash(response){
    return md5(response);
}

// should have checks for correct length of pk and verify that it is a good pk
function signMD5Hash(data){

    if(pk != null){
        // have to understnad structure of response object
        const {signature} = web3.eth.accounts.sign(data, pk);
        return signature
    } else {
        res.status(500).send({status: 'server-error', message: 'express-web3 is not correctly configured'})
    }
}

function isValidPK(){

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