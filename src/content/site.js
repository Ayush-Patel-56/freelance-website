export const site = {
  name: 'Marek Vataha',
  tagline: "We’re Marek Vataha, a Prague-based digital studio.",
  avatar: '/src/assets/avatar.jpg',
  headline: {
    lineOne: [
      { type: 'text', value: 'DIGITAL' },
      {
        type: 'image',
        alt: 'Digital product interface thumbnail',
        src: '/src/assets/thumb-brand.jpg',
        aspect: 'book',
      },
      { type: 'text', value: 'SYSTEMS' },
      {
        type: 'image',
        alt: 'AI and data system thumbnail',
        src: '/src/assets/thumb-web.jpg',
        aspect: 'screen',
      },
      { type: 'accent', value: 'that' },
    ],
    lineTwo: [
      { type: 'text', value: 'SCALE' },
      { type: 'accent', value: 'securely.' },
    ],
  },
  actions: {
    primary: { label: 'See Our Work', href: '#work' },
    secondary: { label: 'Services', href: '#services' },
  },
  nav: [
    { label: 'Home', href: '#top', kind: 'home' },
    { label: 'Services', href: '#services', kind: 'services' },
    { label: 'Work', href: '#work' },
    { label: 'About us', href: '#about', kind: 'about' },
    { label: 'Contact', href: '#contact', kind: 'contact' },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
  ],
  marqueeText: 'Product Engineering / AI & Data / Secure Platforms',
  badgeText: 'Build useful products that perform and scale',
  brandStatement: [
    { value: 'We build ' },
    { value: 'digital products', bold: true },
    { value: ', ' },
    { value: 'AI-enabled workflows', bold: true },
    { value: ', and ' },
    { value: 'secure platforms', bold: true },
    {
      value:
        '. We combine product strategy, experience design, and engineering to turn complex challenges into ',
    },
    { value: 'clear, reliable experiences', bold: true },
    { value: ' that grow with your business.' },
  ],
}
