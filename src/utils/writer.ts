import { ServerResponse } from "http";

export function writeJson(response: ServerResponse, payload?: Object, code: number = 200) {
  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(JSON.stringify(payload, null, 2));
}

export function writeMessage(response: ServerResponse, message?: string, code: number = 200) {
  const payload = { message: message }
  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(JSON.stringify(payload, null, 2));
}

export function sendStatus(response: ServerResponse, code: number) {
  response.statusCode = code
  response.end()
}