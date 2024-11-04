"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '../store/AuthStore';
import { usePathname } from "next/navigation";

export function useAuthRedirect() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if(!loading){
      if(user)
        router.push('/dashboard');
      else if(!user && pathname !=="/register")
        router.push("/login");
    }
    
  }, [user, router, pathname,loading]);
}
