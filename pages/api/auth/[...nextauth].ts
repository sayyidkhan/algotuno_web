import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import Auth0Provider from "next-auth/providers/auth0"
import CredentialProvider from "next-auth/providers/credentials"
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // https://next-auth.js.org/configuration/providers
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "john",
        },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credential) => {
        // get the credentials
        const username = credential.username;
        const password = credential.password;
        // perform a database call & login
        return loginUser({ username, password });
      }
    }),
  ],
  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,


  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/account/signin',  // Displays signin page
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async session({ session, token, user }) { return session },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: {
    colorScheme: "light",
  },

  // Enable debug messages in the console if you are having problems
  debug: true,
})

export const loginUser = async ({username, password}) => {
  if(!password) {
    throw new Error("Accounts Have to login with password.");
  }

  // perform a database call
  async function getUser() {
    const user = await prisma.user.findUnique({
      where: { "username" : username }
    });
    return user;
  }
  // return the user for login
  const user = await getUser();
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) {
    throw new Error("Password Incorrect.");
  }

  return user;
};


export const registerBasicUser = async({email, username, password }) => {
  // empty validation
  if(!email) {
    throw new Error("Email cannot be empty");
  }
  if(!username) {
    throw new Error("Username cannot be empty");
  }
  if(!password) {
    throw new Error("Password cannot be empty");
  }
  // check existing record validation
  async function validateUser(criteria, value) {
    // let whereClause = {};
    // whereClause[criteria] = value;
    const user = await prisma.user.findUnique({
      where: { [criteria] : value }
    });
    return user;
  }
  const validateUsernameExist = await validateUser("username" , username);
  if(validateUsernameExist !== null) {
    throw new Error("This username existed, please choose another username.");
  }
  const validateEmailExist = await validateUser("email" , email);
  if(validateEmailExist !== null) {
    throw new Error("This email existed, please choose another email.");
  }

  // encrypt the password
  const saltRounds = 10;
  const hashPass = await bcrypt.hash(password, saltRounds)
  // save the record into the database
  async function createUser() {
    const user = {
      "email": email,
      "username": username,
      "password": hashPass,
    };
    const _createUser = await prisma.user.create({ data: user });
    return _createUser;
  };

  return createUser()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
}

