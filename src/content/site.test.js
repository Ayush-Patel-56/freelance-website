import { describe, expect, test } from 'vitest'
import { site } from './site'

describe('site content', () => {
  test('has a name and tagline', () => {
    expect(typeof site.name).toBe('string')
    expect(site.name.length).toBeGreaterThan(0)
    expect(site.tagline).toContain(site.name)
  })

  test('headline lines contain at least one accent entry each', () => {
    const hasAccent = (line) => line.some((part) => part.type === 'accent')
    expect(hasAccent(site.headline.lineOne)).toBe(true)
    expect(hasAccent(site.headline.lineTwo)).toBe(true)
  })

  test('has primary and secondary actions with labels and hrefs', () => {
    expect(site.actions.primary).toMatchObject({ label: expect.any(String), href: expect.any(String) })
    expect(site.actions.secondary).toMatchObject({ label: expect.any(String), href: expect.any(String) })
  })

  test('has at least one nav item and one social link', () => {
    expect(site.nav.length).toBeGreaterThan(0)
    expect(site.social.length).toBeGreaterThan(0)
  })

  test('has marquee text', () => {
    expect(typeof site.marqueeText).toBe('string')
    expect(site.marqueeText.length).toBeGreaterThan(0)
  })
})
