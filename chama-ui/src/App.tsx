import { useEffect, useState } from 'react'

import { supabase } from './supabaseClient.tsx'


interface Profile {
  id: string
  name: string
  role: string
  contact: string
}
export default function App() {
  const [profiles, setprofiles] = useState<Profile[]>([])

  useEffect(() => {
    getprofiles()
  }, [])

  async function getprofiles() {
    const { data, error } = await supabase.from('profiles').select()

    if (error) {
      console.error(error)
      return
    }

    setprofiles(data)
  }

  return (
    <ul>
      {profiles.map((profiles) => (
        <li key={profiles.id}>{profiles.name} |<span>{profiles.role}</span> | <span>{profiles.contact}</span></li>
      ))}
    </ul>
  )
}

