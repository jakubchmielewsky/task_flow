"use client";

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '../store/AuthStore';
import { usePathname } from "next/navigation";

export function useAuthRedirect() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const pathname = usePathname();

  

  useEffect(() => {
    if(!loading){
      if(user && pathname !=="/dashboard"){
        redirect('/dashboard');
      }
      else if(!user && pathname !=="/register" && pathname !=="/login")
        redirect("/login");
    }
    
  }, [user, pathname,loading]);
}
