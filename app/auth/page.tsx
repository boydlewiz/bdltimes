'use client';

import { useState } from 'react';
import { SignIn } from '@/components/auth/SignIn';
import { SignUp } from '@/components/auth/SignUp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin" className="flex justify-center">
          <SignIn />
        </TabsContent>
        <TabsContent value="signup" className="flex justify-center">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
} 