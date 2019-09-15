let crypto = require('crypto');

crypto.getHashes()
//哈希算法（散列算法）
let md5 = crypto.createHash('md5');
md5.update();
md5.digest('hex');


//HMAC算法将散列算法与一个密钥结合在一起，以阻止对签名完整性的破坏
let hmac = crypto.createHmac('sha1', key)//openssl genrsa -out rsa_private.key 1024
hmac.update();
hmac.digest();

//对称加密
let cipher = crypto.createCipher('blowfish', key);
let encry = cipher.update(str, 'utf8', 'hex')
encry += cipher.final('hex');

let deciper=crypto.createDecipher()
let deEncry=deciper.update(encry,'hex','utf8');
deEncry+=deciper.final('utf8');


//非对称加密
//openssl rsa -in rsa_private.key -pubout -out rsa_public.key
crypto.publicEncrypt(key,buffer);
crypto.privateDecrypt(key,buffer)


//签名
let sign=crypto.createSign('RSA-SHA256');
sign.update(str);
let signed=sign.sign(private_key,'hex');

let verify=crypto.createVerify('RSA-SHA256')
verify.update(str);
let verifyResult=verify.verify(public_key,signed,'hex');

