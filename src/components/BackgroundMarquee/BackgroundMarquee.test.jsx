import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { BackgroundMarquee } from './BackgroundMarquee'
import { site } from '../../content/site'

describe('BackgroundMarquee', () => {
  test('is hidden from assistive tech and repeats the marquee text for a seamless loop', () => {
    render(<BackgroundMarquee />)
    const track = screen.getByTestId('marquee-track')
    expect(track).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getAllByText(site.marqueeText)).toHaveLength(2)
  })
})
