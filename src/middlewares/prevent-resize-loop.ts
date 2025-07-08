import { createMiddleware } from 'hono/factory';

export const preventResizeLoop = createMiddleware(async (c, next) => {
  const via = c.req.header("via") ?? "";
  if (/image-resizing/.test(via)) {
    return fetch(c.req.raw);
  }
  return next();
});