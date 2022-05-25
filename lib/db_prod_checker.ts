export const BASE_URL = process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_NEXTAUTH_URL
    : process.env.NEXTAUTH_URL;