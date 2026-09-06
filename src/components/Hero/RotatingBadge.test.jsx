import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { RotatingBadge } from './RotatingBadge'
import { site } from '../../content/site'

describe('RotatingBadge', () => {
  test('is decorative and renders the looped badge copy', () => {
    const { container } = render(<RotatingBadge />)
    const wrapper = container.firstChild
    expect(wrapper).toHaveAttribute('aria-hidden', 'true')
    expect(container.querySelector('textPath').textContent).toContain(site.badgeText)
  })
})
