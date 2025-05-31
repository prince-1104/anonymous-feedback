// types/ApiResponse.ts

export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?: {
      content: string;
      createdAt: Date;
    }[];
  }
  