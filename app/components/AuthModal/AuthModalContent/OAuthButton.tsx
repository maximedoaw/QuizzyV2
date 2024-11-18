import { Button } from '@/components/ui/button';
import { auth } from '@/firebase/clientApp';
import Image from 'next/image';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { AiOutlineLoading } from 'react-icons/ai';

type OAuthButtonProps = {};


const OAuthButton: React.FC<OAuthButtonProps> = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="flex flex-col space-y-3">
      {/* Bouton Google */}
      <Button
        className="flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-400"
        onClick={() => signInWithGoogle()}
        disabled={loading}
      >
        {loading ? (
          <AiOutlineLoading className="animate-spin text-white mr-2" size={20} />
        ) : (
          <Image src="/images/googlelogo.png" alt="Google" width={20} height={20} className="mr-2" />
        )}
        Google
      </Button>


      {/* Séparateur */}
      <div className="flex items-center justify-center">
        <hr className="flex-grow border-gray-300" />
        <span className="px-4 text-gray-500">ou</span>
        <hr className="flex-grow border-gray-300" />
      </div>
    </div>
  );
};

export default OAuthButton;
