const fs = require("fs");
const https = require("https");
const httpProxy = require("http-proxy");

const argv = process.argv;
const serverUrl = argv[2];

// Generate or provide HTTPS certificate and key
const options = {
    key: fs.readFileSync("key.pem"), // Replace with the path to your private key
    cert: fs.readFileSync("cert.pem"), // Replace with the path to your certificate
};

const proxy = httpProxy.createProxyServer({});
const PORT = 443;
// HTTPS server
https.createServer(options, (req, res) => {
    console.log(`Proxying request to: ${req.url}`);
    proxy.web(req, res, { target: serverUrl }); // Replace with your target URL
}).listen(PORT, () => {
    console.log(`HTTPS Proxy server running on https://localhost:${PORT}`);
    console.log(`Proxying request to: ${serverUrl}`);
});