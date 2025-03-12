# Doctors Dental Website

This ia a dental website where all the treatments and other services are listed for a local dental clinic in Bogura, Bangladesh.

## Here are all the chapters.

1. [Tech Stacks](#tech-stacks)
2. [Locale](#locale)
3. [How to get started](#how-to-get-started)

## Tech Stacks

- Next.js
- Payload CMS
- Typescript
- MongoDB (with Payload that uses Mongoose)
- Cloudflare R2 (For file storage)

## Locale

This website supports multiple locales using the `next-intl` package. Currently the website supports two locale.

- English (US)
- Bangla (BD)

## How to get started

To get started with the project,

1. Clone the repo.

```bash
git clone https://github.com/mortogn/arafat-dentist-website.git
```

2. Install the dependencies. This project uses npm as the package manager.

```bash
npm install
```

3. After installing all the packages. Look for the file `.env.example` and copy everything from the file.
4. Create a new file `.env` and paste everything there. Your `.env` file should look like this.

```env
DATABASE_URI=mongodb://127.0.0.1/your-database-name
PAYLOAD_SECRET=YOUR_SECRET_HERE

R2_ACCESS_TOKEN=
R2_SECRET_TOKEN=
R2_ENDPOINT=
R2_BUCKET=


BASE_URL=http://localhost:3000
```

# blank

blank

## Attributes

- **Database**: mongodb
- **Storage Adapter**: localDisk
