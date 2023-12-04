import http2 from 'http2';

const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_OK,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = http2.constants;

/* eslint no-shadow: "off" */
enum serverCodes {
  'Ok' = HTTP_STATUS_OK,
  'BadRequest' = HTTP_STATUS_BAD_REQUEST, // 400
  'UnAuth' = HTTP_STATUS_UNAUTHORIZED, // 401
  'Forbidden' = HTTP_STATUS_FORBIDDEN, // 403
  'NotFound' = HTTP_STATUS_NOT_FOUND, // notFound
  'ServerError' = HTTP_STATUS_INTERNAL_SERVER_ERROR,
}

export default serverCodes;
