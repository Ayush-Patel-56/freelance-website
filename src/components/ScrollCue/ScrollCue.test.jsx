import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { ScrollCue } from './ScrollCue'

describe('ScrollCue', () => {
  test('renders a labeled scroll-down button', () => {
    render(<ScrollCue />)
    expect(screen.getByRole('button', { name: 'Scroll down' })).toBeInTheDocument()
  })

  test('scrolls to one viewport height on click', () => {
    window.scrollTo = vi.fn()
    render(<ScrollCue />)
    screen.getByRole('button', { name: 'Scroll down' }).click()
    expect(window.scrollTo).toHaveBeenCalledWith({ top: window.innerHeight, behavior: 'smooth' })
  })
})
