
export function writeJson(response: any, payload?: Object, code: number = 200) {
  if (typeof payload === 'string') payload = { message: payload }
  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(payload ? JSON.stringify(payload, null, 2) : null);
}
