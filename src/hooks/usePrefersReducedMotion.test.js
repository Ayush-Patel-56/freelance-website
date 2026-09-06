import { act, renderHook } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function mockMatchMedia(initialMatches) {
  let listener
  const mediaQueryList = {
    matches: initialMatches,
    addEventListener: (_event, callback) => {
      listener = callback
    },
    removeEventListener: () => {},
  }
  window.matchMedia = () => mediaQueryList
  return {
    trigger(matches) {
      mediaQueryList.matches = matches
      listener({ matches })
    },
  }
}

describe('usePrefersReducedMotion', () => {
  test('returns false when the user has not requested reduced motion', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
  })

  test('returns true when the user has requested reduced motion', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(true)
  })

  test('updates when the media query changes after mount', () => {
    const mediaQuery = mockMatchMedia(false)
    const { result } = renderHook(() => usePrefersReducedMotion())
    act(() => mediaQuery.trigger(true))
    expect(result.current).toBe(true)
  })
})
