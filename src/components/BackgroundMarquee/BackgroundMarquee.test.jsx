import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { BackgroundMarquee } from './BackgroundMarquee'
import { site } from '../../content/site'

describe('BackgroundMarquee', () => {
  test('is hidden from assistive tech and repeats each marquee word for a seamless loop', () => {
    render(<BackgroundMarquee />)
    const track = screen.getByTestId('marquee-track')
    expect(track).toHaveAttribute('aria-hidden', 'true')

    const words = site.marqueeText.split('/').map((word) => word.trim())
    for (const word of words) {
      expect(screen.getAllByText(word)).toHaveLength(2)
    }
  })
})
