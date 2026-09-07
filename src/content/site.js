export const site = {
  name: 'Alex Rivera',
  tagline: "I'm Alex Rivera, Berlin based..",
  headline: {
    lineOne: [
      { type: 'text', value: 'BRAND & WEB' },
      {
        type: 'image',
        alt: 'Brand identity project thumbnail',
        gradient: 'linear-gradient(135deg, #f96f39, #e9e7e3)',
      },
      { type: 'accent', value: 'designer,' },
    ],
    lineTwo: [
      { type: 'text', value: 'WEBFLOW' },
      {
        type: 'image',
        alt: 'Webflow project thumbnail',
        gradient: 'linear-gradient(135deg, #191919, #f96f39)',
      },
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
