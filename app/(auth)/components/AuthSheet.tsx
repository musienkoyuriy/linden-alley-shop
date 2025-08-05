'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { SignInForm } from "./SignInForm";
import { useState } from "react";
import { SignUpForm } from "./SignUpForm";
import { UserProfileMenu } from "./UserProfileMenu";
import { UserDto } from "@/use-cases/users";

interface AuthSheetProps {
  currentUser: UserDto | null;
}

export function AuthSheet({ currentUser }: AuthSheetProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          {currentUser ? `Привіт, ${currentUser.firstName}!` : 'Увійти'}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isSignUp ? "Реєстрація" : "Увійти"}</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          {currentUser ?
            <UserProfileMenu
              user={currentUser}
              onSignOut={() => {
                setOpen(false);
              }}
            /> :
            isSignUp ? (
              <SignUpForm goToSignIn={() => setIsSignUp(false)} onSuccess={handleClose} />
            ) : (
              <SignInForm goToSignUp={() => setIsSignUp(true)} onSuccess={handleClose} />
            )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
