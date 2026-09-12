import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { PortfolioFooter } from './PortfolioPage'

describe('PortfolioFooter contact form & headings', () => {
  test('renders contact heading and accessible input fields with labels', () => {
    render(<PortfolioFooter />)

    // Verify contact section and heading hierarchy
    expect(screen.getByRole('heading', { level: 2, name: /let’s discuss your vision/i })).toBeInTheDocument()
    expect(screen.getByText(/fluent in english and hindi/i)).toBeInTheDocument()

    // Verify input fields with associated labels
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument()

    // Verify consent checkbox and submit CTA
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send a message/i })).toBeInTheDocument()
  })
})
