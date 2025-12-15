import crypto from 'crypto';

export default {
  md5: function (variable) {
    return crypto.createHash('md5').update(variable).digest('hex');
  },

  hmacSha256: function (variable, secret) {
    return crypto.createHmac('sha256', secret).update(variable).digest('hex');
  },

  hmacSha512: function (variable, secret) {
    return crypto.createHmac('sha512', secret).update(variable).digest('hex');
  },
};
