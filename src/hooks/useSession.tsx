'use client'
import { useEffect, useState } from 'react'
import { sessionSchema, sessionType } from '@/lib/sessionSchema'

const SESSION_STORAGE_KEY = 'session-cache'
const SESSION_CACHE_TIME = 3600000 // 1 hour in milliseconds

export function useSession() {
  const [session, setSession] = useState<sessionType>(() => {
    // Try to load from localStorage first
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(SESSION_STORAGE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          // Check if cache is still valid (within 1 hour)
          if (Date.now() - timestamp < SESSION_CACHE_TIME) {
            return sessionSchema.parse(data)
          }
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
    return { uid: 0 }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await fetch('/api/session')
        if (response.ok) {
          const data = await response.json()
          const validatedSession = sessionSchema.parse(data)
          setSession(validatedSession)
          // Cache the session data
          localStorage.setItem(
            SESSION_STORAGE_KEY,
            JSON.stringify({
              data: validatedSession,
              timestamp: Date.now(),
            }),
          )
        }
      } catch (error) {
        console.error('Failed to load session:', error)
      } finally {
        setLoading(false)
      }
    }
    loadSession()
  }, [])

  return { session, loading }
}
