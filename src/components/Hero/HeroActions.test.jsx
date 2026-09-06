import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { HeroActions } from './HeroActions'
import { site } from '../../content/site'

describe('HeroActions', () => {
  test('renders the primary and secondary CTAs with correct hrefs', () => {
    render(<HeroActions />)
    expect(screen.getByRole('link', { name: site.actions.primary.label })).toHaveAttribute(
      'href',
      site.actions.primary.href,
    )
    expect(screen.getByRole('link', { name: site.actions.secondary.label })).toHaveAttribute(
      'href',
      site.actions.secondary.href,
    )
  })
})
