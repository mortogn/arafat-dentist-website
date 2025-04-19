declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    R2_ACCESS_TOKEN: string
    R2_SECRET_TOKEN: string
    R2_ENDPOINT: string
    R2_BUCKET: string

    NEXT_PUBLIC_BASE_URL: string

    NEXT_PUBLIC_UMAMI_TRACK_CODE: string
    NEXT_PUBLIC_UMAMI_URL: string
  }
}
