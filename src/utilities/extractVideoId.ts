/**
 * Extracts the YouTube video ID from various YouTube URL formats
 *
 * @param url - YouTube URL (supports youtube.com and youtu.be formats) or directly a video ID
 * @returns The extracted video ID or null if not found
 */
export const extractVideoId = (url: string): string | null => {
  if (!url) return null

  // Check if the string is already a YouTube video ID (no format validation)
  if (!/[/?&]/.test(url)) return url

  // Handle youtu.be format
  const shortUrlRegex = /youtu\.be\/([a-zA-Z0-9_-]+)/
  const shortUrlMatch = url.match(shortUrlRegex)
  if (shortUrlMatch) return shortUrlMatch[1]

  // Handle youtube.com formats
  const standardRegex = /(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([a-zA-Z0-9_-]+)/
  const standardMatch = url.match(standardRegex)
  if (standardMatch) return standardMatch[1]

  return null
}
