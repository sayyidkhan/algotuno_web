// config/auth_check.ts

export function authorization_check(auth_header){
    try{
        const auth_secret = process.env.NEXT_PUBLIC_API_SECRET_KEY;
        const auth_token = auth_header.split(" ")[1];
        console.log(auth_token);

        if (auth_token === auth_secret) {
            return true;
        } else {
            return false;
        }
    } catch (error){
        return false;
    }
}
