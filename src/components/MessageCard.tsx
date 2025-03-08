'use client';

import React from 'react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { Message } from '@/model/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { ApiResponse } from '@/types/ApiResponse';

type MessageCardProps = {
  message: Message;
  onMessageDeleteAction: (messageId: string) => void;
};

export function MessageCard({ message, onMessageDeleteAction }: MessageCardProps) {
  const handleDeleteConfirm = async () => {
    try {
      if (typeof message._id !== 'string') {
        throw new Error("Invalid message ID");
      }
      const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);
      toast.success(response.data.message);
      onMessageDeleteAction(message._id);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? 'Failed to delete message');
    }
  };

  return (
    <Card className="border rounded-lg shadow-sm">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">
            {message.content || "No Content"}
          </CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action is irreversible. This message will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-sm text-gray-500">
          {message.createdAt ? dayjs(message.createdAt).format('MMM D, YYYY h:mm A') : "Unknown Date"}
        </div>
      </CardHeader>
      <CardContent>
        {/* You can display additional message details here */}
      </CardContent>
    </Card>
  );
}
