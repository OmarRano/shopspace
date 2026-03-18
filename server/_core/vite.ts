import { createServer as createViteServer } from 'vite';
import express from 'express';

export async function setupVite(app: express.Application, server: any) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.ssrLoadModule);
  app.use(vite.middlewares);
}

export async function serveStatic(app: express.Application) {
  // In production, serve static files
  app.use(express.static('dist'));
}