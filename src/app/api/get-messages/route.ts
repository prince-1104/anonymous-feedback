import { dbConnect } from '@/lib/dbConnect';
import UserModel from '@/lib/models/User';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { User } from 'next-auth';

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const _user = session?.user as User & { id?: string };

  if (!session || !_user?.id) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(_user.id);

  try {
    const result = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: '$messages' },
      { $sort: { 'messages.createdAt': -1 } },
      { $group: { _id: '$_id', messages: { $push: '$messages' } } },
    ]);

    if (!result?.length) {
      return Response.json(
        { success: false, message: 'User or messages not found' },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, messages: result[0].messages },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching messages:', error);
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
