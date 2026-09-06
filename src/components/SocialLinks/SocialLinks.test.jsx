import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SocialLinks } from './SocialLinks'
import { site } from '../../content/site'

describe('SocialLinks', () => {
  test('renders a link for every social entry with the correct href', () => {
    render(<SocialLinks />)
    site.social.forEach(({ label, href }) => {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href)
    })
  })

  test('opens links in a new tab safely', () => {
    render(<SocialLinks />)
    const link = screen.getByRole('link', { name: site.social[0].label })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })
})
