#file:../src/i18n/routing.ts

This project is built with Payload CMS and Next.js (Typescript). All the codes generated needs to be in typescript.

This project has two locale, en-US and bn-BD and is using next-intl package to handle things.

All the pages of next.js will recieve a params prop that will have `locale` in it.
Example,

```tsx
export default async function Home({ params }: { params: Promise<{ locale: 'en-US' | 'bn-BD' }> }) {
  const { locale } = await params
  //.... other codes
}
```

Most of the pages will be static and for that next-intl requires a `setRequestLocale` value set. Here is an example from their doc,
example,

```tsx
import {setRequestLocale} from 'next-intl/server';

export default function IndexPage({params: {locale}}) {
  // Enable static rendering
  setRequestLocale(locale);

  // Once the request locale is set, you
  // can call hooks from `next-intl`
  const t = useTranslations('IndexPage');

  return (
    // ...
  );
}
```

We mostly do not use `useTranslations` since we are allowing payload to handle that.
Here are two files that we use to fetch contents,
#file:../src/utilities/getGlobals.ts
#file:../src/utilities/getPageBySlug.ts

Notice how both these function is taking locale as a prop.

For payload CMS collection examples,
#File:../src/collections/Pages/index.ts
#File:../src/collections/Media.ts

For the env variable types,
#File:../src/env.d.ts
