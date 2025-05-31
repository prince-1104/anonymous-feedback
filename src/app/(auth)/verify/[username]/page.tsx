'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import * as z from 'zod';

import { verifySchema } from '@/schemas/verifySchema';
import { ApiResponse } from '../../../../../types/ApiResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function VerifyAccount() {
  const router = useRouter();
  const { username } = useParams<{ username: string }>();

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    if (!username) {
      setMessage('Username is missing from the URL.');
      setIsError(true);
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await axios.post<ApiResponse>('/api/verify-code', {
        username,
        code: data.code,
      });

      setMessage(response.data.message);
      setIsError(false);

      // Redirect after short delay
      setTimeout(() => {
        router.replace('/sign-in');
      }, 1500);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      setMessage(
        axiosError.response?.data.message ??
          'An unexpected error occurred. Please try again.'
      );
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>

        {message && (
          <div
            className={`text-sm px-4 py-2 rounded-md ${
              isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}
          >
            {message}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <Input
                    {...field}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Verify'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
