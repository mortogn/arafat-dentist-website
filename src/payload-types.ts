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
      icon?: ('none' | 'phone' | 'whatsapp' | 'email' | 'facebook' | 'instagram' | 'twitter') | null;
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
    reviews: Review;
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
    reviews: ReviewsSelect<false> | ReviewsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    header: Header;
    socials: Socials;
    contacts: Contacts;
    footer: Footer;
  };
  globalsSelect: {
    header: HeaderSelect<false> | HeaderSelect<true>;
    socials: SocialsSelect<false> | SocialsSelect<true>;
    contacts: ContactsSelect<false> | ContactsSelect<true>;
    footer: FooterSelect<false> | FooterSelect<true>;
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
  slugLock?: boolean | null;
  /**
   * The page's URL
   */
  slug: string;
  layout?:
    | (HeroBlock | BookingFormBlock | TreatmentsBlock | VideoReviewBlock | StatsBlock | CallToActionBlock)[]
    | null;
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
  text: {
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
  };
  image: string | Media;
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
  slugLock?: boolean | null;
  /**
   * The page's URL
   */
  slug: string;
  /**
   * A short description of the treatment
   */
  description?: string | null;
  /**
   * The treatment's thumbnail image. The aspect ratio should be 5:3
   */
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
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TreatmentsBlock".
 */
export interface TreatmentsBlock {
  /**
   * The title of the section
   */
  title: string;
  /**
   * The description of the section
   */
  description: {
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
  };
  /**
   * Check this box to show all treatments
   */
  showAllTreatments?: boolean | null;
  /**
   * Select the treatments to display
   */
  treatments?: (string | Treatment)[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'treatments';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "VideoReviewBlock".
 */
export interface VideoReviewBlock {
  title: string;
  description?: {
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
  reviews: (string | Review)[];
  id?: string | null;
  blockName?: string | null;
  blockType: 'video-review';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reviews".
 */
export interface Review {
  id: string;
  /**
   * The title of the review
   */
  title?: string | null;
  type?: ('Video' | 'Text' | 'Image') | null;
  /**
   * Information about the video review
   */
  video?: {
    /**
     * The thumbnail image for the video review
     */
    thumbnail: string | Media;
    /**
     * The ID of the Youtube video. For example, if the video URL is https://www.youtube.com/watch?v=abc123, the ID is abc123.
     */
    videoId: string;
    /**
     * The title of the review
     */
    title: string;
    /**
     * The short description of the review
     */
    description: {
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
    };
  };
  /**
   * Information about the text review
   */
  text?: {
    /**
     * The title of the review
     */
    title: string;
    /**
     * The short description of the review
     */
    description: {
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
    };
    patient: {
      /**
       * The image of the patient
       */
      image?: (string | null) | Media;
      name: string;
      location: string;
    };
  };
  /**
   * Information about the image review
   */
  image?: {
    /**
     * The image for the review
     */
    image?: (string | null) | Media;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "StatsBlock".
 */
export interface StatsBlock {
  stats?:
    | {
        label: string;
        value: string;
        icon: string | Media;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'stats';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CallToActionBlock".
 */
export interface CallToActionBlock {
  /**
   * The title of the Call To Action Section
   */
  title: string;
  /**
   * The description of the Call To Action Section
   */
  description: {
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
  };
  buttons?: ButtonsField;
  id?: string | null;
  blockName?: string | null;
  blockType: 'call-to-action';
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
      } | null)
    | ({
        relationTo: 'reviews';
        value: string | Review;
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
  slugLock?: T;
  slug?: T;
  layout?:
    | T
    | {
        hero?: T | HeroBlockSelect<T>;
        'booking-form'?: T | BookingFormBlockSelect<T>;
        treatments?: T | TreatmentsBlockSelect<T>;
        'video-review'?: T | VideoReviewBlockSelect<T>;
        stats?: T | StatsBlockSelect<T>;
        'call-to-action'?: T | CallToActionBlockSelect<T>;
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
  text?: T;
  image?: T;
  id?: T;
  blockName?: T;
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
 * via the `definition` "TreatmentsBlock_select".
 */
export interface TreatmentsBlockSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  showAllTreatments?: T;
  treatments?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "VideoReviewBlock_select".
 */
export interface VideoReviewBlockSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  reviews?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "StatsBlock_select".
 */
export interface StatsBlockSelect<T extends boolean = true> {
  stats?:
    | T
    | {
        label?: T;
        value?: T;
        icon?: T;
        id?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CallToActionBlock_select".
 */
export interface CallToActionBlockSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  buttons?: T | ButtonsFieldSelect<T>;
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
 * via the `definition` "treatments_select".
 */
export interface TreatmentsSelect<T extends boolean = true> {
  title?: T;
  slugLock?: T;
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
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reviews_select".
 */
export interface ReviewsSelect<T extends boolean = true> {
  title?: T;
  type?: T;
  video?:
    | T
    | {
        thumbnail?: T;
        videoId?: T;
        title?: T;
        description?: T;
      };
  text?:
    | T
    | {
        title?: T;
        description?: T;
        patient?:
          | T
          | {
              image?: T;
              name?: T;
              location?: T;
            };
      };
  image?:
    | T
    | {
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
export interface Socials {
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
 * via the `definition` "contacts".
 */
export interface Contacts {
  id: string;
  contacts?:
    | {
        /**
         * The name of the contact
         */
        name: string;
        /**
         * The text to display for the link
         */
        label: string;
        /**
         * The URL to link to
         */
        url: string;
        /**
         * The icon to display next to the contact
         */
        icon: 'none' | 'phone' | 'email' | 'map' | 'whatsapp';
        id?: string | null;
      }[]
    | null;
  _status?: ('draft' | 'published') | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: string;
  logo: string | Media;
  links?:
    | {
        /**
         * The title of the group of links. For example, Quick Link, Useful Links, etc.
         */
        groupTitle: string;
        groupLinks: {
          /**
           * The text to display for the link
           */
          label: string;
          /**
           * The URL to link to
           */
          url: string;
          id?: string | null;
        }[];
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
 * via the `definition` "contacts_select".
 */
export interface ContactsSelect<T extends boolean = true> {
  contacts?:
    | T
    | {
        name?: T;
        label?: T;
        url?: T;
        icon?: T;
        id?: T;
      };
  _status?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer_select".
 */
export interface FooterSelect<T extends boolean = true> {
  logo?: T;
  links?:
    | T
    | {
        groupTitle?: T;
        groupLinks?:
          | T
          | {
              label?: T;
              url?: T;
              id?: T;
            };
        id?: T;
      };
  _status?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ButtonsBlock".
 */
export interface ButtonsBlock {
  buttons?: ButtonsField;
  id?: string | null;
  blockName?: string | null;
  blockType: 'buttons';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CheckListBlock".
 */
export interface CheckListBlock {
  alignment?: ('left' | 'center') | null;
  /**
   * Choose the size of the check icon
   */
  size?: ('small' | 'medium' | 'large') | null;
  checklist?:
    | {
        /**
         * Provide the details for the checklist item
         */
        label: {
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
        };
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'checklist';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "YoutubeEmbedBlock".
 */
export interface YoutubeEmbedBlock {
  /**
   * The ID of the Youtube video. Example: https://www.youtube.com/watch?v=abc, here abc is the ID
   */
  videoId: string;
  /**
   * Upload a thumbnail image for the Youtube video.
   */
  thumbnail?: (string | null) | Media;
  id?: string | null;
  blockName?: string | null;
  blockType: 'youtube-embed';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ImageBlock".
 */
export interface ImageBlock {
  image: string | Media;
  width: number;
  height: number;
  alignment?: ('left' | 'center' | 'right') | null;
  /**
   * Optional caption for the image.
   */
  caption?: string | null;
  /**
   * Alternative text for the image, improving accessibility.
   */
  altText?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'image';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FaqBlock".
 */
export interface FaqBlock {
  /**
   * The title of this FAQ section
   */
  title: string;
  /**
   * The description of this FAQ section
   */
  description?: {
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
  faq?:
    | {
        /**
         * The question of this FAQ
         */
        question: string;
        /**
         * The answer of this FAQ
         */
        answer: {
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
        };
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'faq';
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