export const site = {
  name: 'Marek Vataha',
  tagline: "I'm Marek Vataha, Prague based..",
  avatar: '/src/assets/avatar.jpg',
  headline: {
    lineOne: [
      { type: 'text', value: 'BRAND' },
      {
        type: 'image',
        alt: 'Brand identity project thumbnail',
        src: '/src/assets/thumb-brand.jpg',
        aspect: 'book',
      },
      { type: 'text', value: '& WEB' },
      {
        type: 'image',
        alt: 'Webflow project thumbnail',
        src: '/src/assets/thumb-web.jpg',
        aspect: 'screen',
      },
      { type: 'accent', value: 'designer,' },
    ],
    lineTwo: [
      { type: 'text', value: 'WEBFLOW' },
      { type: 'accent', value: 'developer.' },
    ],
  },
  actions: {
    primary: { label: 'See My Work', href: '#work' },
    secondary: { label: 'Services', href: '#services' },
  },
  nav: [
    { label: 'Home', href: '#top', kind: 'home' },
    { label: 'Services', href: '#services', kind: 'services' },
    { label: 'Work', href: '#work' },
    { label: 'About me', href: '#about', kind: 'about' },
    { label: 'Contact', href: '#contact', kind: 'contact' },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
  ],
  marqueeText: 'Passion / Craft / Story',
  badgeText: 'Rise and shine among your competition with a brand that stands the test of time.',
  brandStatement: [
    { value: 'I build ' },
    { value: 'future-proof visual identities', bold: true },
    { value: ' and ' },
    { value: 'brand design systems', bold: true },
    { value: ' grounded in ' },
    { value: 'strong strategy', bold: true },
    {
      value:
        ". I believe a website is one of the most valuable assets a business can have. That's why I focus on ",
    },
    { value: 'turning brand strategy into effective web design', bold: true },
    { value: ' and ' },
    { value: 'sustainable Webflow', bold: true },
    { value: ' development.' },
  ],
}
