// import crypto from 'crypto';
const crypto = require('crypto-js');
// 生成签名函数
export function signRequest(secretKey, secretId, action, region, version) {
  const date = new Date().toISOString().split('T')[0]; // 获取日期
  const service = 'tiia';
  const host = 'tiia.tencentcloudapi.com';
  
  const payload = JSON.stringify({
    ImageBase64: 'base64字符串', // 替换实际数据
  });

  const canonicalRequest = [
    'POST',
    '/',
    '',
    `content-type:application/json\nhost:${host}\n`,
    'content-type;host',
    crypto.createHash('sha256').update(payload).digest('hex'),
  ].join('\n');

  const stringToSign = [
    'TC3-HMAC-SHA256',
    `${Math.floor(Date.now() / 1000)}`,
    `${date}/${service}/tc3_request`,
    crypto.createHash('sha256').update(canonicalRequest).digest('hex'),
  ].join('\n');

  const kDate = crypto.createHmac('sha256', `TC3${secretKey}`).update(date).digest();
  const kService = crypto.createHmac('sha256', kDate).update(service).digest();
  const kSigning = crypto.createHmac('sha256', kService).update('tc3_request').digest();
  const signature = crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex');

  return `TC3-HMAC-SHA256 Credential=${secretId}/${date}/${service}/tc3_request, SignedHeaders=content-type;host, Signature=${signature}`;
}


