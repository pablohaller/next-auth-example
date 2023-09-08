# Next Auth Example with Google Provider

Made with **Next 13** and using **app router**.

## 1. Setup Local Environment Variables

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
JWT_SECRET_KEY=
```

To generate keys, the following site can be a good option:
https://generate-secret.vercel.app/32

## 2. Setup auth route

File under `api/auth/[...nextauth]/route.ts`.
This file serves as configuration for NextAuth, setting up the provider (Google, but could be anyone listed on the page or own credentials). Also, more providers can be added (Github, Discord, etc).

```
 providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    // ... any other provider that you need
  ],
```

It also uses callbacks to setup JWT tokens based on information we get from the provider:

```
callbacks: {
    async signIn({ user, account }: any) {
      // Possibility to check for information of the user and really look for authorization
      console.log(user, account)
      return true;
    },
    async jwt({ token, user, account }: any) {
      // Create the token
      console.log(user, token, account);
      if (account) {
        const signedToken = await SignToken(user?.email as string);
        token.userToken = signedToken;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      // Save the token in session
      session.loggedUser = token.userToken;
      return session;
    },
  },
```

## 3. Add provider

The application must be wrapped with a NextAuth provider to embed the application with its functionalities.

This can be seen in the main page layout (`layout.tsx`) under the `app` folder; children from the layout are wrapped with the `Providers.tsx` component.

## 4. Add middleware

Middleware catches all routes and identifies if there is a session or not; more stuff can be done here using the middleware function, but this is enough to protect all routes that fall under dashboard.

## 5. Testing the login

Trying to access `/dashboard` directly or going to `http://localhost:3000/api/auth/signin`.

## 6. Resources

- https://next-auth.js.org/tutorials/securing-pages-and-api-routes
- https://next-auth.js.org/configuration/callbacks
- https://next-auth.js.org/configuration/providers/oauth
- https://next-auth.js.org/providers/google
- https://next-auth.js.org/getting-started/example
- https://next-auth.js.org/configuration/initialization#route-handlers-app
- https://dev.to/ifennamonanu/building-google-jwt-authentication-with-nextauth-5g78
- https://www.youtube.com/watch?v=6N3Rumo-c3s
- https://github.com/Godsont/Google-Authentication
