import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { HeroHeadline } from './HeroHeadline'
import { site } from '../../content/site'

describe('HeroHeadline', () => {
  test('renders every text and accent part from both headline lines', () => {
    render(<HeroHeadline />)
    ;[...site.headline.lineOne, ...site.headline.lineTwo]
      .filter((part) => part.type !== 'image')
      .forEach((part) => {
        expect(screen.getByText(part.value)).toBeInTheDocument()
      })
  })

  test('renders an accessible placeholder for every image part', () => {
    render(<HeroHeadline />)
    ;[...site.headline.lineOne, ...site.headline.lineTwo]
      .filter((part) => part.type === 'image')
      .forEach((part) => {
        expect(screen.getByRole('img', { name: part.alt })).toBeInTheDocument()
      })
  })
})
