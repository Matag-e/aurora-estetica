# Aurora Estética

Landing page em português, React + TypeScript + Vite, com CSS responsivo, conteúdo pré-renderizado e nenhum serviço externo necessário para exibir a página.

## Começar

Requisitos: Node.js 20 ou superior e npm. Em novos ambientes, prefira uma versão LTS mantida e compatível com as dependências do lockfile.

```sh
npm ci
npm run dev
```

Abra o endereço local indicado pelo Vite. O site deve ser servido por HTTP; não abra o HTML diretamente pelo explorador de arquivos.

```sh
npm run build
npm test
npm run preview
```

O build verifica o TypeScript, gera os arquivos otimizados e pré-renderiza o conteúdo em `dist/index.html`. O React hidrata esse HTML ao carregar. A pré-renderização mantém textos, navegação, FAQ e contato direto por e-mail disponíveis mesmo sem JavaScript. O menu compacto e a preparação da mensagem dependem de JavaScript; links de contato e seções continuam no HTML.

`npm test` deve ser executado após o build. Os testes verificam destinos internos, seções, SEO, referências a arquivos, rótulos do formulário, placeholder de WhatsApp e geração de URLs. A implementação usa Vite 6 para compatibilidade com Node 20.16; o `package-lock.json` registra as versões instaladas.

## Estratégia e conteúdo

- Proposta de valor: cuidado personalizado e acolhedor que valoriza a beleza natural.
- Conversão principal: iniciar uma conversa com a clínica. O contato confirmado é `backupwpp1910@gmail.com`.
- Narrativa: apresentação → essência → áreas de cuidado → diferenciais → dúvidas → contato.
- Direção visual: linguagem editorial, tipografia serifada, branco quente, preto suave e bege; amplo respiro e áreas reservadas a fotografias.
- Fatos do briefing: nome, segmento, tratamentos faciais, cuidados com a pele, procedimentos não invasivos, atendimento personalizado, ambiente acolhedor e beleza natural.
- Sugestões criativas: títulos, organização, textos de apoio e ilustrações abstratas em CSS. Não são fotografias da clínica.
- Informações ausentes: WhatsApp, fotos, endereço, horários, preços, catálogo específico, profissionais e domínio. Não foram inventadas. Não há depoimentos, avaliações, estatísticas ou promessas de resultados.

## Personalizar

### Contato e WhatsApp

Edite `src/config.ts`. O e-mail já está configurado. Para ativar o WhatsApp, preencha `whatsappNumber` somente com dígitos no formato internacional brasileiro: DDI 55 + DDD + número, totalizando 12 ou 13 dígitos. Confirme a titularidade e teste o destino antes de publicar. A validação é apenas de formato. Enquanto vazio ou inválido, o botão permanece desativado e há indicação de contato a confirmar. Atualize também a resposta correspondente no FAQ ao ativar o canal.

O formulário **prepara** uma mensagem: o visitante revisa e envia pelo aplicativo de e-mail. Nenhum envio automático, armazenamento ou confirmação de entrega é simulado. Sem aplicativo configurado, o endereço fica disponível para copiar ou usar em um webmail. Não inclua informações sensíveis na mensagem. Não há backend, analytics, cookies próprios ou coleta persistente pelo site.

### Fotografias

Os dois blocos de imagem são placeholders explícitos, construídos em CSS e identificados visualmente e por tecnologias assistivas. Para substituir:

1. Adicione fotos autorizadas em `public/images/`, de preferência WebP/AVIF, com dimensões adequadas e compressão.
2. Troque o conteúdo do componente `Photo` em `src/App.tsx` por um `<img>` com descrição real em `alt`, `width` e `height`. Use `object-fit: cover` para preservar o enquadramento.
3. Use carregamento prioritário para a imagem principal; aplique `loading="lazy"` e `decoding="async"` para imagens abaixo da dobra.
4. Remova a legenda de placeholder apenas quando o conteúdo definitivo estiver aprovado.

Fontes são locais do sistema; não há download de fontes, imagens remotas ou dependência de CDN. Cores, espaçamentos e layouts ficam em `src/styles.css`; conteúdo e FAQ em `src/App.tsx`.

## SEO e publicação

Inclui título, descrição, idioma, Open Graph, Twitter Card, favicon, estrutura semântica, um H1 e dados estruturados `Organization` contendo apenas dados conhecidos. Não há `LocalBusiness` com endereço fictício.

Antes de publicar, preencha o domínio real em uma URL canônica e em `og:url` no `index.html`; adicione uma imagem social autorizada com URL absoluta em `og:image` e mude o Twitter Card para `summary_large_image` se apropriado. Gere `public/sitemap.xml` com a URL real e adicione sua linha `Sitemap:` ao `public/robots.txt`. Esses dados foram omitidos para não colocar domínios fictícios em produção. Atualize metadados e JSON-LD se o nome ou e-mail mudar.

Execute `npm ci`, `npm run build` e `npm test`. Publique **o conteúdo de `dist/`** em hospedagem estática. Não há roteamento que exija fallback de SPA. O caminho base relativo facilita hospedagem em subpastas; confira a URL final no servidor escolhido. O ZIP inclui `dist/` pronto, código-fonte, lockfile e documentação, sem `node_modules`.

`public/_headers` oferece cabeçalhos para hospedagens compatíveis, como Netlify e Cloudflare Pages. Em outros servidores, configure os equivalentes, incluindo HTTPS. A política de segurança permite apenas recursos locais e bloqueia incorporação em frames; revise-a se adicionar integrações. HSTS deve ser configurado na hospedagem quando HTTPS estiver consolidado. Não aplique a política de produção ao servidor de desenvolvimento, que usa WebSocket e scripts próprios.

## Acessibilidade e verificação

Há link para pular conteúdo, landmarks, foco visível, menu com estado expandido e fechamento por Escape, controles rotulados, mensagens de status, FAQ nativo com `details`, alvos de toque e suporte a movimento reduzido. O layout adapta-se a dispositivos pequenos. Recursos externos abertos em nova aba usam `noopener noreferrer`.

Os testes automatizados são verificações funcionais e estruturais, não uma certificação WCAG ou auditoria de segurança. Valide manualmente navegação com Tab/Shift+Tab/Enter/Espaço/Escape, leitor de tela, zoom de 200%, larguras de 320 px a desktop, abertura de e-mail, destino definitivo do WhatsApp e fotos reais antes do lançamento. Não foram inventadas pontuações de Lighthouse.

## Estrutura

```text
src/App.tsx          Seções e interações
src/config.ts       Contatos e URLs
src/styles.css      Identidade visual e responsividade
src/main.tsx        Montagem e hidratação
public/             Favicon, robots e cabeçalhos
scripts/            Pré-renderização e testes
dist/               Resultado publicável do build
```

## Limitações e dados pendentes

O briefing acessível termina no trecho que proíbe informações inventadas. Foram atendidos os requisitos visíveis e os solicitados nesta entrega. Endereço, horários, preços e agenda dependem da confirmação da clínica; nenhum agendamento é efetivado pelo site. Para receber mensagens diretamente em um servidor, será necessária uma integração própria de formulário, com política de privacidade, proteção contra abuso e tratamento adequado de dados.
