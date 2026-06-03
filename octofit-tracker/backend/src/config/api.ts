export const apiPort = Number(process.env.PORT) || 8000;

export function getApiBaseUrl() {
  const codespaceName = process.env.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-${apiPort}.app.github.dev`;
  }

  return `http://localhost:${apiPort}`;
}
