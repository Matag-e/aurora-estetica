import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const markup = renderToString(createElement(App));
  const html = await readFile('dist/index.html', 'utf8');
  if (!html.includes('<div id="root"></div>')) throw new Error('Raiz de pré-renderização não encontrada.');
  await writeFile('dist/index.html', html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`));
  console.log('HTML pré-renderizado: conteúdo disponível para buscadores e sem JavaScript.');
} finally {
  await server.close();
}
