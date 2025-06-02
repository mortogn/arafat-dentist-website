import { User } from '@/payload-types'
import { cookies } from 'next/headers'

export async function getMeUser() {
  const payloadToken = (await cookies()).get('payload-token')?.value

  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${payloadToken}`,
    },
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch user data')
  }

  const data = await res.json()
  return data.user as User
}
