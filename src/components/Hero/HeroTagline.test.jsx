import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { HeroTagline } from './HeroTagline'
import { site } from '../../content/site'

describe('HeroTagline', () => {
  test('renders the tagline text', () => {
    render(<HeroTagline />)
    expect(screen.getByText(site.tagline)).toBeInTheDocument()
  })
})
