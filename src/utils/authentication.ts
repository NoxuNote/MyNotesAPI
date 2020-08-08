import { ServerResponse } from "http"

/**
 * Returns wether the request contains valid a user-id or not
 * @param req HTTPRequest
 */
export function isAuthenticated(req: Request): boolean {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/g
    return (
        req.headers['x-api-user-id'] && 
        req.headers['x-api-user-id'].match(uuidPattern)?.length == 1
    )
}

/**
 * Return 401 if the request has no authentication header
 */
export function checkAuthentication(req: Request, res: ServerResponse): boolean {
    if (isAuthenticated(req)) return true
    res.writeHead(401, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
        message: "X-Api-User-Id header is invalid or not provided"
    }))
    return false
}

/**
 * Controls authentication header, send 401 and return null if invalid, else return accountUuid 
 */
export function getAccountUuid(req: Request, res: ServerResponse): string | null {
    if (checkAuthentication(req, res)) {
        return req.headers['x-api-user-id']
    }
    return null
}