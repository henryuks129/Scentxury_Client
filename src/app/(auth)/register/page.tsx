'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/auth-store';
import api from '@/lib/api';
import { toast } from 'sonner';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  password: z.string().min(8, 'Min 8 characters'),
  referralCode: z.string().optional(),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', data);
      const { user, token } = res.data.data;
      setAuth(user, token);
      toast.success('Account created! Welcome to Scentxury.');
      router.push('/survey');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white/5 p-8 backdrop-blur-lg">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl font-bold text-white">Join Scentxury</h1>
        <p className="mt-2 text-stone-400">Discover your signature scent</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input {...register('firstName')} placeholder="First Name"
              className="w-full rounded-lg border border-stone-700 bg-stone-800 px-4 py-3 text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none" />
            {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>}
          </div>
          <div>
            <input {...register('lastName')} placeholder="Last Name"
              className="w-full rounded-lg border border-stone-700 bg-stone-800 px-4 py-3 text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none" />
            {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>}
          </div>
        </div>
        <div>
          <input {...register('email')} type="email" placeholder="Email"
            className="w-full rounded-lg border border-stone-700 bg-stone-800 px-4 py-3 text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none" />
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
        </div>
        <div>
          <input {...register('phone')} placeholder="Phone (optional)"
            className="w-full rounded-lg border border-stone-700 bg-stone-800 px-4 py-3 text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none" />
        </div>
        <div>
          <input {...register('password')} type="password" placeholder="Password (min 8 chars)"
            className="w-full rounded-lg border border-stone-700 bg-stone-800 px-4 py-3 text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none" />
          {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
        </div>
        <div>
          <input {...register('referralCode')} placeholder="Referral Code (optional)"
            className="w-full rounded-lg border border-stone-700 bg-stone-800 px-4 py-3 text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full rounded-lg bg-amber-600 py-3 font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-50">
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-stone-400">
        Already have an account?{' '}
        <Link href="/login" className="text-amber-500 hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
