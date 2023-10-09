import { useEffect, useState } from 'react'
import { ParsedSPGPPassType } from '@/app/spgp/SPGPPassTypes'
import { fetchWrapper } from '@/lib/fetchWrapper'

export default function usePassTypes(): ParsedSPGPPassType[] {
  const [passTypes, setPassTypes] = useState<ParsedSPGPPassType[]>([])
  useEffect(() => {
    fetchWrapper
      .get('/api/spgp/?only=passTypes')
      .then((r) => setPassTypes(r.passTypes))
  }, [])
  return passTypes
}
