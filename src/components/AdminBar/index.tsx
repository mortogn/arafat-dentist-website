'use client'

import { User } from '@/payload-types'
import Link from 'next/link'
import React, { useEffect } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'

const AdminBar = () => {
  const [user, setUser] = React.useState<User | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchAndSetUser = async (c: AbortController) => {
      const user = await fetch('/api/users/me', {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: c.signal,
      })

      const data = await user.json()

      setUser(data && 'user' in data ? data?.user : null)
    }

    fetchAndSetUser(controller)

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    console.log('User state has changed:', user)
  }, [user])

  if (!user?.role?.includes('admin')) return null

  return (
    <div className="bg-black text-white p-2">
      <MaxWidthWrapper className="flex items-center justify-between">
        <p className="text-sm">
          You are currently logged in as <span className="font-bold">{user?.email}</span> and have
          the role of <span className="font-bold">admin</span>
        </p>
        <div className="[&_a]:font-medium [&_a]:underline text-sm gap-2 flex items-center">
          <Link href={'/admin'}>Admin Panel</Link>
          <Link href={'/admin'}>Appointments</Link>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default AdminBar
