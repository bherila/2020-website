'use client'
import { useEffect, useState } from 'react'
import { sessionSchema, sessionType } from '@/lib/sessionSchema'
import { fetchWrapper } from '@/lib/fetchWrapper'
import { usePathname } from 'next/navigation'

const SESSION_STORAGE_KEY = 'session-cache'
const SESSION_CACHE_TIME = 3600000 // 1 hour in milliseconds

// Global state to prevent multiple fetches
let globalFetchPromise: Promise<sessionType> | null = null

async function loadSession(): Promise<sessionType> {
  try {
    const response = sessionSchema.parse(await fetchWrapper.post('/api/session/', {}))
    localStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify({
        data: response,
        timestamp: Date.now(),
      }),
    )
    return response
  } catch (error) {
    console.error('Failed to load session:', error)
  }
  return { uid: 0 }
}

export function useSession() {
  const pathname = usePathname()
  const [session, setSession] = useState<sessionType>(() => {
    try {
      const cached = localStorage.getItem(SESSION_STORAGE_KEY)
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < SESSION_CACHE_TIME) {
          return sessionSchema.parse(data)
        }
      }
    } catch (e) {}
    return { uid: 0 }
  })
  const [loading, setLoading] = useState(session != null)
  useEffect(() => {
    if (session.uid != 0) return
    globalFetchPromise ??= loadSession()
    globalFetchPromise
      .then((p) => setSession(p))
      .finally(() => {
        globalFetchPromise = null
        setLoading(false)
      })
  }, [session.uid, pathname])

  return { session, loading }
}
