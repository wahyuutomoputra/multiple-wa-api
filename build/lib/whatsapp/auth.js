"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
class Auth {
    constructor(data) {
        this.client = data.client;
        this.id = data.id;
    }
    main() {
        let Authstatus = false;
        this.client.on("authenticated", () => {
            Authstatus = true;
        });
        this.client.on("auth_failure", () => {
            Authstatus = false;
        });
        return { Authstatus };
    }
}
exports.Auth = Auth;
