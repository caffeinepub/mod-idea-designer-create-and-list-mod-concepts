import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Loader2, LogIn, LogOut } from 'lucide-react';

interface LoginButtonProps {
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

export function LoginButton({ className, size = 'default' }: LoginButtonProps) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <Button
      onClick={handleAuth}
      disabled={isLoggingIn}
      variant={isAuthenticated ? 'outline' : 'default'}
      size={size}
      className={className}
    >
      {isLoggingIn ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Giriş yapılıyor...
        </>
      ) : isAuthenticated ? (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Çıkış Yap
        </>
      ) : (
        <>
          <LogIn className="mr-2 h-4 w-4" />
          Giriş Yap
        </>
      )}
    </Button>
  );
}
