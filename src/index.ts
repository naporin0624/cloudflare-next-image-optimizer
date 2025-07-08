import { Hono } from 'hono';
import { transformImageHandler } from '@handlers/transform-image';

const app = new Hono();

app.get('/_next/image', ...transformImageHandler);
app.get("*", (c) => fetch(c.req.raw));

export default app;