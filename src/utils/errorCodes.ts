import http2 from 'http2';

const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
} = http2.constants;

export enum ErrorCodes {
  'BadRequest' = HTTP_STATUS_BAD_REQUEST, // 400
  'UnAuth' = HTTP_STATUS_UNAUTHORIZED, // 401
  'Forbidden' = HTTP_STATUS_FORBIDDEN, // 403
  'NotFound' = HTTP_STATUS_NOT_FOUND, // notFound
}
