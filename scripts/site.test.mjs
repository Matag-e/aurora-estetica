import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createServer } from 'vite';

const html = await readFile('dist/index.html', 'utf8');

test('HTML final contém as seções e todos os links internos têm destino', () => {
  for (const id of ['conteudo', 'inicio', 'essencia', 'cuidados', 'diferenciais', 'duvidas', 'contato']) assert.ok(html.includes(`id="${id}"`), id);
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${match[1]}"`), match[1]);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
});

test('SEO, FAQ, campos rotulados e contato estão no HTML pré-renderizado', () => {
  assert.ok(html.includes('lang="pt-BR"'));
  assert.ok(html.includes('name="description"'));
  assert.ok(html.includes('application/ld+json'));
  assert.equal([...html.matchAll(/<details>/g)].length, 5);
  for (const name of ['name', 'interest', 'message']) assert.ok(html.includes(`for="${name}"`));
  assert.ok(html.includes('backupwpp1910@gmail.com'));
  assert.ok(html.includes('WhatsApp em breve'));
  assert.ok(!html.includes('https://wa.me/'));
});

test('arquivos locais referenciados pelo build existem', async () => {
  for (const match of html.matchAll(/(?:src|href)="(\.\/[^"?#]+)"/g)) await access(`dist/${match[1].slice(2)}`);
  await access('dist/robots.txt');
  await access('dist/_headers');
});

test('configuração protege URLs de WhatsApp e codifica mensagens de e-mail', async () => {
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
  try {
    const config = await server.ssrLoadModule('/src/config.ts');
    assert.equal(config.getWhatsappUrl(''), null);
    assert.equal(config.getWhatsappUrl('javascript:alert(1)'), null);
    assert.equal(config.getWhatsappUrl('000'), null);
    assert.ok(config.getWhatsappUrl('5511999999999').startsWith('https://wa.me/5511999999999?text='));
    const link = new URL(config.getEmailUrl('Cuidado & dúvidas', 'Olá!\nMinha mensagem.'));
    assert.equal(link.searchParams.get('subject'), 'Cuidado & dúvidas');
    assert.equal(link.searchParams.get('body'), 'Olá!\nMinha mensagem.');
  } finally { await server.close(); }
});
