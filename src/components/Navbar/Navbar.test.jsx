import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Navbar } from './Navbar'
import { site } from '../../content/site'

describe('Navbar', () => {
  test('starts closed with nav items hidden from assistive tech', () => {
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: site.name })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    const links = screen.getAllByRole('link', { hidden: true })
    expect(links).toHaveLength(site.nav.length)
    links.forEach((link) => {
      expect(link).toHaveAttribute('aria-hidden', 'true')
    })
  })

  test('clicking the toggle opens the menu and reveals nav links', () => {
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: site.name })
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    site.nav.forEach(({ label, href }) => {
      const link = screen.getByRole('link', { name: label })
      expect(link).toHaveAttribute('aria-hidden', 'false')
      expect(link).toHaveAttribute('href', href)
    })
  })

  test('clicking the toggle again closes the menu', () => {
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: site.name })
    fireEvent.click(toggle)
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
