import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { dbConnect } from '@/lib/dbConnect';
import UserModel from '@/lib/models/User';
import { User } from 'next-auth';

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user as User & { id?: string };

  if (!session || !user?.id) {
    return Response.json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }

  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      user.id,
      { isAcceptingMessages: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        { success: false, message: 'User not found to update' },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: 'Message acceptance status updated successfully',
        isAcceptingMessages: updatedUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating status:', error);
    return Response.json(
      { success: false, message: 'Server error updating status' },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user as User & { id?: string };

  if (!session || !user?.id) {
    return Response.json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const foundUser = await UserModel.findById(user.id);

    if (!foundUser) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving status:', error);
    return Response.json(
      { success: false, message: 'Server error retrieving status' },
      { status: 500 }
    );
  }
} 