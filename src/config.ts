export const site = {
  name: 'Aurora Estética',
  email: 'emailteste@teste.com',
  whatsappNumber: '',
  whatsappMessage: 'Olá, Aurora Estética! Gostaria de saber mais sobre os cuidados e o atendimento.',
};

export function getWhatsappUrl(number: string): string | null {
  return /^55\d{10,11}$/.test(number)
    ? `https://wa.me/${number}?text=${encodeURIComponent(site.whatsappMessage)}`
    : null;
}

export function getEmailUrl(subject = 'Quero conhecer a Aurora Estética', body = ''): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
}
