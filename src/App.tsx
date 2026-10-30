import { useRef, useState, type FormEvent } from 'react';
import { getEmailUrl, getWhatsappUrl, site } from './config';

const services = [
  { number: '01', title: 'Tratamentos faciais', description: 'Um olhar atento para as necessidades do seu rosto, respeitando as particularidades da sua pele.', tag: 'Cuidado individual' },
  { number: '02', title: 'Cuidados com a pele', description: 'Uma conversa sobre sua pele, seus hábitos e os cuidados que fazem sentido para o seu momento.', tag: 'Beleza em equilíbrio' },
  { number: '03', title: 'Estética não invasiva', description: 'Conheça as possibilidades de cuidado da Aurora e converse sobre indicações, etapas e limitações.', tag: 'Naturalidade em foco' },
];

const questions = [
  { title: 'Como posso conhecer os tratamentos?', answer: 'Entre em contato por e-mail para conversar sobre os cuidados disponíveis. A equipe poderá confirmar os procedimentos específicos, a disponibilidade e os valores.' },
  { title: 'Qual cuidado é indicado para a minha pele?', answer: 'A indicação depende das características da sua pele e da análise individual de um profissional habilitado. Conte à equipe suas expectativas e seu histórico. Este site não realiza diagnóstico ou prescrição.' },
  { title: 'O atendimento é personalizado?', answer: 'Sim. O atendimento personalizado, o acolhimento e a valorização da beleza natural são os diferenciais apresentados pela Aurora Estética.' },
  { title: 'Posso falar pelo WhatsApp?', answer: 'O número oficial ainda não foi informado. Por enquanto, utilize o e-mail backupwpp1910@gmail.com. O canal de WhatsApp será disponibilizado quando a clínica confirmar o contato.' },
  { title: 'Onde encontro endereço, horários e valores?', answer: 'Essas informações ainda precisam ser confirmadas pela Aurora. Solicite os detalhes por e-mail antes de planejar sua visita ou solicitar um agendamento.' },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

function Photo({ variant, label, src }: { variant: 'hero' | 'space'; label: string; src?: string }) {
  return <div className={`photo photo--${variant}`} role="img" aria-label={`Placeholder de fotografia: ${label}`}>
    {src ? <img className="photo-image" src={src} alt={label} /> : <div className="photo-arch" aria-hidden="true"><div className="photo-orb" /><div className="photo-stone" /></div>}
  </div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactReady, setContactReady] = useState(false);
  const [messageUrl, setMessageUrl] = useState('');
  const menuButton = useRef<HTMLButtonElement>(null);
  const whatsappUrl = getWhatsappUrl(site.whatsappNumber);

  function prepareContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get('name') ?? '').trim();
    const interest = String(fields.get('interest') ?? 'Conhecer a Aurora');
    const message = String(fields.get('message') ?? '').trim();
    if (!name) {
      (form.elements.namedItem('name') as HTMLInputElement).setCustomValidity('Informe seu nome.');
      form.reportValidity();
      return;
    }
    setMessageUrl(getEmailUrl(`Contato pelo site — ${interest}`, `Olá, Aurora!\n\nMeu nome é ${name}.\nTenho interesse em: ${interest}.\n\n${message}`));
    setContactReady(true);
  }

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="header">
      <a className="brand" href="#inicio" aria-label="Aurora Estética — início"><span className="brand-name">aurora<span className="brand-dot">.</span></span><span className="brand-subtitle">ESTÉTICA & BELEZA</span></a>
      <button ref={menuButton} className="menu-button" type="button" aria-controls="navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Fechar' : 'Menu'} <span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
      <nav id="navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Navegação principal" onKeyDown={(event) => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } }}>
        <a href="#essencia" onClick={() => setMenuOpen(false)}>Nossa essência</a><a href="#cuidados" onClick={() => setMenuOpen(false)}>Cuidados</a><a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas</a><a className="nav-contact" href="#contato" onClick={() => setMenuOpen(false)}>Vamos conversar <Arrow diagonal /></a>
      </nav>
    </header>
    <main id="conteudo">
      <section className="hero section-shell" id="inicio" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow"><span className="tiny-sun" aria-hidden="true">✳</span> O SEU MOMENTO DE CUIDADO</p><h1 id="hero-title">Sua beleza,<br />em <em>essência.</em></h1><p className="hero-description">Cuidar de si é voltar ao que faz você se sentir bem. Na Aurora, sua pele recebe um olhar individual e sua beleza natural encontra espaço.</p><a className="button button-dark" href="#contato">Encontre seu cuidado <Arrow diagonal /></a><p className="hero-note">Tratamentos faciais · Pele · Estética não invasiva</p></div>
        <div className="hero-visual"><Photo variant="hero" src="/images/mulher.png" label="beleza natural" /><span className="visual-seal" aria-hidden="true">BELEZA<br /><i>com</i><br />NATURALIDADE</span></div>
        <div className="hero-bottom"><span>UM NOVO OLHAR PARA VOCÊ</span><a href="#essencia">Explore a Aurora <span aria-hidden="true">↓</span></a></div>
      </section>
      <div className="values-strip" aria-label="Nossa proposta"><span>Cuidado com intenção</span><span aria-hidden="true">✳</span><span>Beleza natural</span><span aria-hidden="true">✳</span><span>Acolhimento em cada detalhe</span></div>
      <section id="essencia" className="about section-shell section-space" aria-labelledby="about-title">
        <div className="about-visual"><Photo variant="space" src="/images/clinica.png" label="ambiente da clínica" /><span className="image-footnote">Um espaço para desacelerar e cuidar de você.</span></div>
        <div className="about-copy"><p className="eyebrow">01 / NOSSA ESSÊNCIA</p><h2 id="about-title">O cuidado começa<br />em <em>você.</em></h2><p>A Aurora Estética é um espaço dedicado aos tratamentos faciais, aos cuidados com a pele e à estética não invasiva.</p><p>Acreditamos em um atendimento que escuta, acolhe e respeita sua individualidade. Uma experiência pensada para valorizar o que já é seu: sua beleza natural.</p><a className="text-link" href="#cuidados">Conheça nossos cuidados <Arrow /></a></div>
      </section>
      <section id="cuidados" className="care section-space" aria-labelledby="care-title"><div className="section-shell"><div className="section-heading"><div><p className="eyebrow">02 / POSSIBILIDADES DE CUIDADO</p><h2 id="care-title">Sua pele. Seu tempo.<br /><em>Seu cuidado.</em></h2></div><p>O primeiro passo é entender você.<br />Explore nossas áreas de atuação e converse com a equipe sobre as opções disponíveis.</p></div>
        <div className="service-list">{services.map((service) => <article className="service" key={service.number}><span className="service-number">{service.number}</span><div><span className="service-tag">{service.tag}</span><h3>{service.title}</h3></div><p>{service.description}</p><a href="#contato" aria-label={`Conversar sobre ${service.title.toLowerCase()}`} className="circle-link"><Arrow diagonal /></a></article>)}</div><p className="section-note">Converse com a equipe para confirmar procedimentos, indicações e disponibilidade.</p>
      </div></section>
      <section id="diferenciais" className="difference section-shell section-space" aria-labelledby="difference-title"><p className="eyebrow">03 / O JEITO AURORA</p><div className="section-heading"><h2 id="difference-title">Mais presença.<br /><em>Mais você.</em></h2><p>O que torna o cuidado especial está na forma como você é recebida e em como sua individualidade é respeitada.</p></div><div className="benefits"><article><span className="benefit-symbol" aria-hidden="true">◎</span><h3>Um olhar individual</h3><p>Atendimento personalizado para conversar sobre suas necessidades e expectativas.</p></article><article><span className="benefit-symbol" aria-hidden="true">⌒</span><h3>Acolhimento de verdade</h3><p>Um ambiente acolhedor, com espaço para ouvir e deixar você à vontade.</p></article><article><span className="benefit-symbol" aria-hidden="true">✳</span><h3>Sua beleza em primeiro lugar</h3><p>Valorização da beleza natural e respeito às características que fazem você ser você.</p></article></div></section>
      <section className="editorial"><span className="eyebrow">UM CONVITE PARA OLHAR PARA SI</span><p>O melhor do cuidado<br />é se reconhecer <em>nele.</em></p><a className="text-link" href="#contato">Reserve um momento para você <Arrow diagonal /></a></section>
      <section id="duvidas" className="faq section-shell section-space" aria-labelledby="faq-title"><div><p className="eyebrow">04 / ANTES DE COMEÇAR</p><h2 id="faq-title">Uma conversa<br /><em>com clareza.</em></h2><p>Algumas respostas para dar<br />o próximo passo com tranquilidade.</p><a className="text-link" href={getEmailUrl('Tenho uma dúvida sobre a Aurora Estética')}>Ainda tenho uma dúvida <Arrow diagonal /></a></div><div className="faq-list">{questions.map((question) => <details key={question.title}><summary>{question.title}<span aria-hidden="true" className="faq-plus">+</span></summary><p>{question.answer}</p></details>)}</div></section>
      <section id="contato" className="contact section-space" aria-labelledby="contact-title"><div className="section-shell contact-grid"><div><p className="eyebrow">05 / SEU PRIMEIRO PASSO</p><h2 id="contact-title">Vamos cuidar<br />de <em>você?</em></h2><p>Conte o que você procura. A equipe da Aurora poderá orientar seus próximos passos e informar os detalhes do atendimento.</p><a className="contact-email" href={getEmailUrl()}>{site.email} <Arrow diagonal /></a><div className="whatsapp">{whatsappUrl ? <a className="button button-outline" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Conversar pelo WhatsApp <Arrow diagonal /></a> : <><button className="button button-outline" type="button" disabled aria-describedby="whatsapp-note">WhatsApp em breve <span aria-hidden="true">↗</span></button><p id="whatsapp-note" className="small">Número oficial a confirmar. Por enquanto, fale por e-mail.</p></>}</div></div>
        <form className="contact-form" onSubmit={prepareContact} onChange={() => setContactReady(false)}><h3>Comece uma conversa</h3><p className="small">Prepare sua mensagem e envie pelo seu aplicativo de e-mail.</p><label htmlFor="name">Como podemos chamar você?</label><input id="name" name="name" autoComplete="given-name" required maxLength={80} placeholder="Seu nome" onInput={(event) => event.currentTarget.setCustomValidity('')} /><label htmlFor="interest">Qual cuidado desperta seu interesse?</label><select id="interest" name="interest"><option>Conhecer a Aurora</option>{services.map((service) => <option key={service.number}>{service.title}</option>)}</select><label htmlFor="message">O que gostaria de saber? <span className="optional">(opcional)</span></label><textarea id="message" name="message" rows={3} maxLength={1500} placeholder="Conte um pouco sobre o que você procura." /><p className="privacy-note">Seus dados não são armazenados neste site. Ao abrir seu e-mail, você poderá revisar a mensagem antes de enviar. Evite incluir dados de saúde.</p><button className="button button-dark" type="submit">Preparar meu e-mail <Arrow diagonal /></button><div className="form-result" role="status" aria-live="polite">{contactReady && <><p>Mensagem preparada. Abra seu aplicativo de e-mail, revise e envie para a Aurora.</p><a className="text-link" href={messageUrl}>Abrir e-mail para enviar <Arrow diagonal /></a><p className="small">Sem aplicativo configurado? Escreva diretamente para {site.email}.</p></>}</div></form>
      </div></section>
    </main>
    <footer className="footer section-shell"><div><a className="brand" href="#inicio" aria-label="Aurora Estética — voltar ao início"><span className="brand-name">aurora<span className="brand-dot">.</span></span><span className="brand-subtitle">ESTÉTICA & BELEZA</span></a><p>Cuidado que respeita sua essência.</p></div><div><a href="#cuidados">Nossos cuidados</a><a href="#duvidas">Perguntas frequentes</a><a href={getEmailUrl()}>Entre em contato</a></div><div className="footer-bottom"><span>© Aurora Estética. Todos os direitos reservados.</span><a href="#inicio">Voltar ao início ↑</a></div></footer>
  </>;
}
