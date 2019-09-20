const debug = require('debug')('egg-passport-coding');
const assert = require('assert');
const Strategy = require('../passport-coding').Strategy;
module.exports = app => {
    const config = app.config.passportCoding;
    config.passReqToCallback = true;
    assert(config.key, '[egg-passport-coding] config.passportCoding.key required');
    assert(config.secret, '[egg-passport-coding] config.passportCoding.secret required');
    app.passport.use('coding', new Strategy(config, (req, accessToken, refreshToken, expires_in, profile, done) => {
        console.log("arguments = ", {accessToken, refreshToken, profile, expires_in, done});
        const user = {
            provider: "coding",
            id: profile.id,
            name: profile.global_key,
            displayName: profile.name,
            photo: profile.avatar,
            accessToken,
            refreshToken,
            profile
        };
        debug("%s %s get user: %j", req.method, req.url, user);
        console.log("do verifying...", app.passport.doVerify);
        app.passport.doVerify(req, user, done);
    }));
};