"use client";

import { Message } from "@/components/common/from/form-message";
import { useEffect, useState } from "react";
import { LoginVisual } from "@/components/features/auth/login-visual";
import { LoginForm } from "@/components/features/auth/login-form";

export default function Login(props: { searchParams: Promise<Message> }) {
  const [message, setMessage] = useState<Message | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    const loadMessage = async () => {
      const searchParams = await props.searchParams;
      setMessage(searchParams);
    };
    loadMessage();
    // Mark that we're client-side now
    setIsClient(true);
  }, [props.searchParams]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Brand Visual Element */}
      <LoginVisual isClient={isClient} />
            
      {/* Right Side - Login Form */}
      <LoginForm message={message} />
    </div>
  );
}