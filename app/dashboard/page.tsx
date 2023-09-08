"use client";
import { signOut, useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  return (
    <div>
      <div>Logged in!</div>
      <div>{JSON.stringify(session)}</div>
      <button
        className="border border-teal-300 p-2 m-2"
        onClick={() => {
          signOut();
        }}
      >
        SignOut!
      </button>
    </div>
  );
};

export default Page;
