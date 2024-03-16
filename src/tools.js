const crypto = require("crypto");
const fs = require("fs");
const mime = require("mime");

class Tools {
    static SHA256(raw) {
        let hash = crypto.createHash("sha256");
        hash.update(raw);

        return hash.digest("hex");
    }

    static escapeSQL(raw) {
        if (!raw || !raw.length) return "";

        let escaped = "";

        for (let char of raw) {
            switch (char) {
                case "'":
                case '"':
                case "`":
                case "\\":
                case ";":
                case "#":
                    escaped += `\\${char}`;
                    break;
                default:
                    escaped += char;
                    break;
            }
        }

        return escaped;
    }

    static escapeHTML(raw) {
        if (!raw || !raw.length) return "";
        return raw.replace(/\>/g, "&gt;").replace(/\</g, "lt;").replace(/\&/, "&amp;").replace(/\"/g, "&quot;");
    }

    static fileContentType(file) {
        return mime.getType(file);
    }

    static async writeTextToFile(file, text) {
        return new Promise((resolve, reject) => {
            fs.writeFile(file, text, (ex) => {
                if (ex) {
                    reject(ex);
                    return;
                }

                resolve(true);
            });
        });
    }

    static generateCode(length=8) {
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        let code = "";

        for (let c = 0; c < length; c++) {
            let pos = Math.floor(Math.random() * chars.length);
            code += chars.charAt(pos);
        }

        return code;
    }

    static formatBytes(bytes) {
        switch (true) {
            case (bytes < 1024):
                return `${bytes} B`;
            case (bytes < 1024 * 1024):
                return `${(bytes / 1024).toFixed(2)} kB`;
            case (bytes < 1024 * 1024 * 1024):
                return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
            default:
                return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
        }
    }
}

module.exports = { Tools }; 