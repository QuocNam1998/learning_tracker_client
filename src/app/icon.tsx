// app/icon.tsx
export const runtime = 'edge';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:2002';
  const res = await fetch(new URL('/calendar.png', baseUrl));
  return res;
}
