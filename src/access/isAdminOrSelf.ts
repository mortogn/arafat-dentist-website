import { Access } from 'payload'

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user || !user.role) {
    return false
  }

  if (user.role.includes('admin')) {
    return true
  }

  return {
    id: {
      equals: user.id,
    },
  }
}
