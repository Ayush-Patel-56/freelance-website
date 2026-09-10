export const site = {
  name: 'LitmusFront',
  initials: 'LF',
  tagline: "We’re LitmusFront, a dev collective.",
  avatar: '/src/assets/avatar.jpg',
  headline: {
    lineOne: [
      { type: 'text', value: 'BATTLE-TESTED' },
      {
        type: 'image',
        alt: 'Digital product interface thumbnail',
        src: '/src/assets/thumb-brand.jpg',
        aspect: 'book',
      },
      { type: 'text', value: 'CODE' },
      {
        type: 'image',
        alt: 'AI and data system thumbnail',
        src: '/src/assets/thumb-web.jpg',
        aspect: 'screen',
      },
      { type: 'accent', value: 'that' },
    ],
    lineTwo: [
      { type: 'text', value: 'SHIPS' },
      { type: 'accent', value: 'reliably.' },
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
    { value: 'web applications', bold: true },
    { value: ', ' },
    { value: 'mobile apps', bold: true },
    { value: ', and ' },
    { value: 'cloud-native infrastructure', bold: true },
    {
      value:
        '. We combine full-stack engineering, API design, and DevOps to turn complex requirements into ',
    },
    { value: 'clean, production-ready systems', bold: true },
    { value: ' that scale with your business.' },
  ],
}
