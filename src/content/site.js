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
    { label: 'Home', href: '#home' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
  ],
  marqueeText: 'Passion / Craft / Story',
}
