'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { Message } from '@/lib/models/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { ApiResponse } from '../../types/ApiResponse';

type MessageCardProps = {
  message: Message;
  onMessageDeleteAction: (messageId: string) => void;
};

export function MessageCard({ message, onMessageDeleteAction }: MessageCardProps) {
  const [feedback, setFeedback] = useState('');
  const [isError, setIsError] = useState(false);

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );
      setIsError(false);
      setFeedback(response.data.message);
      onMessageDeleteAction(message._id);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      setIsError(true);
      setFeedback(
        axiosError.response?.data.message ?? 'Failed to delete message'
      );
    }

    // Clear feedback after 4s
    setTimeout(() => setFeedback(''), 4000);
  };

  return (
    <Card className="card-bordered relative">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{message.content}</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-sm text-gray-500">
          {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
        </div>
        {feedback && (
          <div
            className={`mt-2 text-sm rounded px-2 py-1 ${
              isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}
          >
            {feedback}
          </div>
        )}
      </CardHeader>
      <CardContent />
    </Card>
  );
}

