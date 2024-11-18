import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthStore from "@/zustand/AuthStore";
import { auth } from "@/firebase/clientApp";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";

import { FaSpinner, FaCheckCircle } from "react-icons/fa";

const ResetPassword = () => {
  const { open, isOpen } = AuthStore();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  // Fonction pour gérer l'envoi du mail de réinitialisation
  const onSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const sent = await sendPasswordResetEmail(email);
    if (sent) {
      setSuccess(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {success ? "Mot de passe réinitialisé !" : "Reset Password"}
          </DialogTitle>
          {!success && (
            <DialogDescription className="text-center text-gray-600">
              Enter your email for reset
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Affichage en cas de succès */}
        {success ? (
          <div className="flex flex-col items-center space-y-4">
            <FaCheckCircle className="text-green-500 h-16 w-16 mb-4" />
            <p className="text-center text-gray-700">
              Un lien pour réinitialiser votre mot de passe a été envoyé à votre adresse email.
            </p>
            <Button
              size="sm"
              className="px-4 bg-blue-500"
              onClick={() => {
                setSuccess(false);
              }}
            >
              back to home
            </Button>
          </div>
        ) : (
          // Formulaire de réinitialisation du mot de passe
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-4 bg-blue-500 w-full"
              onClick={onSubmit}
              disabled={sending}
            >
              {sending ? (
                <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Send"
              )}
            </Button>

            {/* Afficher une erreur si l'envoi échoue */}
            {error && (
              <p className="text-sm text-red-500 text-center">
                An error was happened 
              </p>
            )}
          </div>
        )}

        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPassword;
