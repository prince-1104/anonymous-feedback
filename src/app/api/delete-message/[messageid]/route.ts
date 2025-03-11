import UserModel from '@/model/User';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function DELETE(
  request: NextRequest,
  context: { params: { messageid: string } } 
) {
  const { params } = context; 
  const messageId = params.messageid;

  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const updateResult = await UserModel.updateOne(
      { _id: session.user.id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Message not found or already deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting message' },
      { status: 500 }
    );
  }
}
