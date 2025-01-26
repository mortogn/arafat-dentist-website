/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ButtonsField".
 */
export type ButtonsField =
  | {
      /**
       * The text to display on the button
       */
      label: string;
      /**
       * The URL to link to
       */
      href: string;
      /**
       * The variant of the button
       */
      variant: 'default' | 'secondary' | 'ghost' | 'outline';
      /**
       * The size of the button
       */
      size: 'default' | 'small' | 'large';
      /**
       * The icon to display on the button
       */
      icon?: 'none' | null;
      id?: string | null;
    }[]
  | null;

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    pages: Page;
    treatments: Treatment;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    treatments: TreatmentsSelect<false> | TreatmentsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    header: Header;
    socials: Social;
  };
  globalsSelect: {
    header: HeaderSelect<false> | HeaderSelect<true>;
    socials: SocialsSelect<false> | SocialsSelect<true>;
  };
  locale: 'en-US' | 'bn-BD';
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  title: string;
  lock?: boolean | null;
  /**
   * The page's URL
   */
  slug: string;
  layout?: (HeroBlock | BookingFormBlock)[] | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (string | null) | Media;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "HeroBlock".
 */
export interface HeroBlock {
  heading: string;
  subheading: string;
  buttons?: ButtonsField;
  underButtonText: string;
  id?: string | null;
  blockName?: string | null;
  blockType: 'hero';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "BookingFormBlock".
 */
export interface BookingFormBlock {
  /**
   * The title of the booking form
   */
  title: string;
  /**
   * The subtitle of the booking form
   */
  subtitle: string;
  image: string | Media;
  /**
   * Show all treatments in the booking form
   */
  allTreatments?: boolean | null;
  /**
   * Select the treatments to show in the booking form
   */
  treatments?: (string | Treatment)[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'booking-form';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "treatments".
 */
export interface Treatment {
  id: string;
  /**
   * The title of the treatment
   */
  title: string;
  lock?: boolean | null;
  /**
   * The page's URL
   */
  slug: string;
  /**
   * A short description of the treatment
   */
  description?: string | null;
  thumbnail: string | Media;
  /**
   * All the details about the treatment including price, duration and benefits
   */
  content?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (string | null) | Media;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'pages';
        value: string | Page;
      } | null)
    | ({
        relationTo: 'treatments';
        value: string | Treatment;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  lock?: T;
  slug?: T;
  layout?:
    | T
    | {
        hero?: T | HeroBlockSelect<T>;
        'booking-form'?: T | BookingFormBlockSelect<T>;
      };
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "HeroBlock_select".
 */
export interface HeroBlockSelect<T extends boolean = true> {
  heading?: T;
  subheading?: T;
  buttons?: T | ButtonsFieldSelect<T>;
  underButtonText?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ButtonsField_select".
 */
export interface ButtonsFieldSelect<T extends boolean = true> {
  label?: T;
  href?: T;
  variant?: T;
  size?: T;
  icon?: T;
  id?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "BookingFormBlock_select".
 */
export interface BookingFormBlockSelect<T extends boolean = true> {
  title?: T;
  subtitle?: T;
  image?: T;
  allTreatments?: T;
  treatments?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "treatments_select".
 */
export interface TreatmentsSelect<T extends boolean = true> {
  title?: T;
  lock?: T;
  slug?: T;
  description?: T;
  thumbnail?: T;
  content?: T;
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * The header of the site
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: string;
  topbar: {
    text: string;
    callToAction?: boolean | null;
    buttons?: ButtonsField;
    showSocials?: boolean | null;
  };
  /**
   * The logo of the site
   */
  logo: string | Media;
  links: {
    /**
     * The text to display for the link
     */
    label: string;
    /**
     * The URL to link to
     */
    href: string;
    /**
     * Show the treatments dropdown
     */
    showTreatments?: boolean | null;
    hasChildren?: boolean | null;
    children?:
      | {
          label: string;
          href: string;
          /**
           * A description of the link
           */
          description?: string | null;
          id?: string | null;
        }[]
      | null;
    id?: string | null;
  }[];
  buttons?: ButtonsField;
  _status?: ('draft' | 'published') | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "socials".
 */
export interface Social {
  id: string;
  socials?:
    | {
        icon: 'facebook' | 'instagram' | 'youtube' | 'twitter' | 'none';
        platform: string;
        url: string;
        id?: string | null;
      }[]
    | null;
  _status?: ('draft' | 'published') | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header_select".
 */
export interface HeaderSelect<T extends boolean = true> {
  topbar?:
    | T
    | {
        text?: T;
        callToAction?: T;
        buttons?: T | ButtonsFieldSelect<T>;
        showSocials?: T;
      };
  logo?: T;
  links?:
    | T
    | {
        label?: T;
        href?: T;
        showTreatments?: T;
        hasChildren?: T;
        children?:
          | T
          | {
              label?: T;
              href?: T;
              description?: T;
              id?: T;
            };
        id?: T;
      };
  buttons?: T | ButtonsFieldSelect<T>;
  _status?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "socials_select".
 */
export interface SocialsSelect<T extends boolean = true> {
  socials?:
    | T
    | {
        icon?: T;
        platform?: T;
        url?: T;
        id?: T;
      };
  _status?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}