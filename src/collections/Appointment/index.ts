import { isAdmin } from '@/access/isAdmin'
import { CollectionConfig } from 'payload'

export const Appointment: CollectionConfig = {
  slug: 'appointments',
  typescript: {
    interface: 'Appointment',
  },
  admin: {
    useAsTitle: 'fullname',
    defaultColumns: ['date', 'fullname', 'phone', 'treatment', 'note'],
  },
  access: {
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      type: 'text',
      name: 'fullname',
      label: 'Full Name',
      required: true,
      admin: {
        readOnly: true,
      },
      maxLength: 40,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'text',
      name: 'phone',
      label: 'Phone',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'date',
      name: 'date',
      label: 'Date',
      required: true,
      admin: {
        readOnly: false,
      },
    },
    {
      type: 'textarea',
      name: 'message',
      label: 'Message',
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'textarea',
      name: 'note',
      label: 'Note',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    // Deprecated
    {
      type: 'relationship',
      name: 'treatment',
      label: 'Treatment',
      relationTo: 'treatments',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: "This field is deprecated. Use 'treatments' instead.",
        disabled: true,
      },
      required: false,
    },
    {
      type: 'relationship',
      name: 'treatments',
      label: 'Treatments',
      relationTo: 'treatments',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      type: 'select',
      name: 'status',
      label: 'Status',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Completed', value: 'completed' },
        { label: 'No Show', value: 'no-show' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'nickname',
      type: 'text',
      label: 'Nickname',
      admin: {
        description: 'This field is used to identify the appointment in the admin panel.',
        position: 'sidebar',
      },
    },
    {
      name: 'time',
      type: 'text',
      label: 'Time',
      admin: {
        description: 'This field is used to store the time of the appointment.',
        position: 'sidebar',
      },
    },
  ],
}
