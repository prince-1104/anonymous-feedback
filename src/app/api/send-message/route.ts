import UserModel from '@/lib/models/User';
import { dbConnect } from '@/lib/dbConnect';
import { z } from 'zod';

const messageSchema = z.object({
  username: z.string().min(3),
  content: z.string().min(1, 'Message cannot be empty'),
});

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();

    const result = messageSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: result.error.errors.map((e) => e.message).join(', '),
        },
        { status: 400 }
      );
    }

    const { username, content } = result.data;

    const user = await UserModel.findOne({ username }).exec();

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessages) {
      return Response.json(
        { success: false, message: 'User is not accepting messages' },
        { status: 403 }
      );
    }

    const newMessage= {
      content,
      createdAt: new Date(),
    };

    user.messages.push(newMessage);
    await user.save();

    return Response.json(
      { success: true, message: 'Message sent successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding message:', error);
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
