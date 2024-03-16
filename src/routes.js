const fs = require("fs");

const { Tools } = require("./tools.js");
const { JWT } = require("./jwt.js");

const headerContent = fs.readFileSync("./public/views/shared/header.html", { encoding: "utf8" }),
      footerContent = fs.readFileSync("./public/views/shared/footer.html", { encoding: "utf8" });

class Routes {
    static API(request, response) {
        response.setHeader("Content-Type", "application/json");

        switch (request.method) {
            case "POST":
                for (let parameter of Object.keys(request.body)) {
                    request.body[parameter] = Tools.escapeSQL(request.body[parameter]);
                }
                break;
            case "GET":
                for (let parameter of Object.keys(request.query)) request.query[parameter] = Tools.escapeSQL(request.query[parameter]);
                break;
        }

        let endpoint = request.originalUrl.substring(request.originalUrl.indexOf("/api/") + 5);

        switch (endpoint) {
            default:
                response.status(404).json({ error: "Unknown Endpoint" });
                break;
        }
    }

    static index(request, response) {
        fs.readFile("./public/views/index.html", { encoding: "utf8" }, async (ex, content) => {
            if (ex) return;

            content = content.replace("{{header}}", headerContent);
            content = content.replace("{{footer}}", footerContent);

            response.setHeader("Content-Type", "text/html");
            response.setHeader("Access-Control-Allow-Origin", "*");

            response.send(content);
        });
    }
}

module.exports = { Routes }; 