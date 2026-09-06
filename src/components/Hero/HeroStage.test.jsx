import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { HeroStage } from './HeroStage'

describe('HeroStage', () => {
  test('assembles the hero copy, badge, and marquee into a two-section stage', () => {
    render(<HeroStage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByTestId('marquee-track')).toBeInTheDocument()
  })
})
