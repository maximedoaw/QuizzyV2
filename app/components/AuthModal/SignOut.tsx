import { Button } from '@/components/ui/button';
import { auth } from '@/firebase/clientApp';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const SignOut = () => {
    const [loading, setLoading] = useState(false);

    const handleSignOut = async () => {
      setLoading(true);
      try {
        await signOut(auth);
        console.log('Utilisateur déconnecté avec succès');
      } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
      } finally {
        setLoading(false);
      }
    };
  return (
    <Button
      className="bg-blue-500 hover:bg-blue-400 flex items-center justify-center space-x-2"
      onClick={handleSignOut}
      disabled={loading}
    >
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin" size={20} />
      ) : (
        'Sign Out'
      )}
    </Button>  )
}

export default SignOut