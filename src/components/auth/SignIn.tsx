import Link from 'next/link';
import React, { useState } from 'react';
import Button from '../ui/Button';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useSession, signIn, signOut } from 'next-auth/react';
const SignIn = () => {
  const { data: session } = useSession();
  return (
    <>
      <div
        className="flex flex-col gap-4 items-center w-[325px] md:w-[400px]"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl capitalize font-semibold">
          {session ? 'Sign Out' : 'Sign In'}
        </h2>
        {!session ? (
          <div className="flex flex-col gap-4 border-b-teal-400">
            <div onClick={() => signIn()} className="flex items-center gap-2">
              <FcGoogle className="w-7 h-7" />
              <div>
                <Button>Sign in with google</Button>
              </div>
            </div>
            <div onClick={() => signIn()} className="flex items-center gap-2">
              <AiFillGithub className="w-7 h-7 text-gray-900" />
              <Button>Sign in with github</Button>
            </div>
          </div>
        ) : (
          <div onClick={() => signOut()}>
            <Button>LogOut</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default SignIn;
