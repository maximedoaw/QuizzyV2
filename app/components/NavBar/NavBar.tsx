import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ThemeButton from './ThemeButton';
import { Input } from '@/components/ui/input';
import AuthModal from '../AuthModal/AuthModal';
import AuthStore from '@/zustand/AuthStore';
import { AiOutlineMenu, AiOutlineClose, AiOutlineSetting } from 'react-icons/ai';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RiAdminLine } from 'react-icons/ri';
import { MdAdd } from 'react-icons/md';
import SignOut from '../AuthModal/SignOut';
import { useRouter } from 'next/navigation';

type NavBarProps = {};

const NavBar: React.FC<NavBarProps> = () => {
  const { changeView, isOpen } = AuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user] = useAuthState(auth);

  const handleChangeView = (view: 'Login' | 'SignUp' | 'ResetPassWord') => {
    changeView(view);
    isOpen();
    setIsSidebarOpen(false); // Fermer la sidebar après le clic
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const router = useRouter();

  return (
    <div className="border flex p-5 justify-between items-center">
      {/* Input de recherche */}
      <Input
        type="text"
        placeholder="Search quizz"
        className="mr-3 max-w-full focus:outline-blue-400"
      />

      {/* Boutons pour les grands écrans */}
      <div className="hidden md:flex space-x-3 items-center">
        {user ? (
          <>
            <SignOut />
            <MdAdd size={60} className="cursor-pointer hover:scale-110 transition-transform" onClick={() => router.push('/CreateQuizz')}/>
            <RiAdminLine size={60} className="cursor-pointer hover:scale-110 transition-transform" />
          </>
        ) : (
          <>
            <Button className="bg-blue-500 hover:bg-blue-400" onClick={() => handleChangeView('Login')}>
              Login
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-400" onClick={() => handleChangeView('SignUp')}>
              SignUp
            </Button>
          </>
        )}
        <ThemeButton />
        <Avatar
          className="mx-auto cursor-pointer"
          onClick={toggleSidebar}
        >
          <AvatarImage src={user?.photoURL as string} alt="Avatar" />
          <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>

      {/* Bouton menu pour les petits écrans */}
      <div className="md:hidden">
        <AiOutlineMenu size={25} onClick={toggleSidebar} className="cursor-pointer" />
      </div>

      {/* Modal d'authentification */}
      <AuthModal />

      {/* Sidebar */}
      {isSidebarOpen && (
        <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 p-5 transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } w-full sm:w-2/3 md:w-1/3 lg:w-1/4`}
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold">Menu</h2>
            <AiOutlineClose size={25} onClick={toggleSidebar} className="cursor-pointer" />
          </div>
          <div className="flex flex-col space-y-4">
            {user ? (
              <>
                <Avatar className="mx-auto cursor-pointer">
                  <AvatarImage src={user?.photoURL as string} alt="Avatar" />
                  <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-gray-600 font-bold text-center text-2xl">{user?.displayName}</p>
                <p className="text-gray-400 font-bold text-center text-sm">{user?.email}</p>

                <SignOut />
                <span className="flex items-center hover:bg-gray-200 p-3 rounded cursor-pointer" onClick={() => router.push('/CreateQuizz')}>
                  <p>Add quizz</p>
                  <MdAdd size={20} className="ml-auto hover:scale-125 transition-transform" />
                </span>
                <span className="flex items-center hover:bg-gray-200 p-3 rounded cursor-pointer">
                  <p>Admin</p>
                  <RiAdminLine size={20} className="ml-auto hover:scale-125 transition-transform" />
                </span>
                <span className="flex items-center hover:bg-gray-200 p-3 rounded cursor-pointer">
                  <p>Settings</p>
                  <AiOutlineSetting size={20} className="ml-auto hover:scale-125 transition-transform" />
                </span>
              </>
            ) : (
              <>
                <Button className="bg-blue-500 hover:bg-blue-400" onClick={() => handleChangeView('Login')}>
                  Login
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-400" onClick={() => handleChangeView('SignUp')}>
                  SignUp
                </Button>
              </>
            )}
            <ThemeButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
