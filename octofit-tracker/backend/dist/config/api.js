"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiPort = void 0;
exports.getApiBaseUrl = getApiBaseUrl;
exports.apiPort = Number(process.env.PORT) || 8000;
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-${exports.apiPort}.app.github.dev`;
    }
    return `http://localhost:${exports.apiPort}`;
}
