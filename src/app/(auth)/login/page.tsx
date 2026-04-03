'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/auth-store';
import api from '@/lib/api';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', data);
      const { user, token } = res.data.data;
      setAuth(user, token);
      toast.success(`Welcome back, ${user.firstName}!`);
      // Hidden Admin: route based on role
      router.push(user.role === 'admin' ? '/admin' : redirect);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="rounded-2xl bg-white/5 p-8 backdrop-blur-lg">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl font-bold text-white">
          Welcome Back
        </h1>
        <p className="mt-2 text-stone-400">
          Sign in to your Scentxury account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-1 block text-sm text-stone-300">Email</label>
          <input
            {...register('email')}
            type="email"
            className="w-full rounded-lg border border-stone-700 bg-stone-800 px-4 py-3 text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm text-stone-300">Password</label>
          <input
            {...register('password')}
            type="password"
            className="w-full rounded-lg border border-stone-700 bg-stone-800 px-4 py-3 text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-amber-600 py-3 font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-stone-700" />
        <span className="text-sm text-stone-500">or</span>
        <div className="h-px flex-1 bg-stone-700" />
      </div>

      <button
        onClick={handleGoogleAuth}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-stone-700 bg-stone-800 py-3 text-white transition-colors hover:bg-stone-700"
      >
        Continue with Google
      </button>

      <p className="mt-6 text-center text-sm text-stone-400">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-amber-500 hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
