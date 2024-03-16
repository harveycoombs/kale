const { Request } = require("express");
const jwt = require("jsonwebtoken");

const secret = "c4eef136d7f2af39830f27e44536e95943023f173cef6f4c7375f83b2b0cf28b5f15671270ee94503b63be34132124fdc83f4c22ccc757cba0b601f463772c06";

class JWT {
    static authenticate(request, next) {
        let token = request.cookies.token;

        if (!token) {
            request.account = null;
            next();
            return;
        }

        jwt.verify(token, secret, (ex, account) => {
            if (ex) {
                request.account = null;
                next();
                return;
            }

            request.account = account;
            next();
        });
    }

    static create(account) {
        let now = new Date();
        return { token: jwt.sign(account, secret), timestamp: now.getTime() };
    }

    static destroy() {
        //to-do
    }
}

module.exports = { JWT }; 