import { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  if (!user || !user.role) {
    return false
  }

  if (user.role.includes('admin')) {
    return true
  }

  return false
}
