import UserModel from '@/lib/models/User';
import { getServerSession } from 'next-auth/next';
import { dbConnect } from '@/lib/dbConnect';
import { authOptions } from '../../auth/[...nextauth]/options';

type RouteContext = {
  params: Promise<{ messageid: string }>
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const { messageid } = await context.params;

  try {
    const result = await UserModel.updateOne(
      { _id: userId },
      { $pull: { messages: { _id: messageid } } }
    );

    if (result.modifiedCount === 0) {
      return Response.json(
        { message: 'Message not found or already deleted', success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { message: 'Message deleted', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return Response.json(
      { message: 'Error deleting message', success: false },
      { status: 500 }
    );
  }
}
