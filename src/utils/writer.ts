import { ServerResponse } from "http";

export function writeJson(response: ServerResponse, payload?: Object, code: number = 200) {
  if (typeof payload === 'string') payload = { message: payload }
  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(payload ? JSON.stringify(payload, null, 2) : null);
}

export function sendStatus(response: ServerResponse, code: number) {
  response.statusCode = code
  response.end()
}