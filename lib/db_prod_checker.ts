//lib/db_prod_checker.ts

let db_url = '';

if (process.env.NODE_ENV === 'production') {
    db_url = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
} else {
    db_url = process.env.NEXTAUTH_URL;
}

export default db_url;

