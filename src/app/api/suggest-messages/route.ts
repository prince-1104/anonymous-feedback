// import OpenAI from 'openai';
// import { NextResponse } from 'next/server';
// import { Readable } from 'stream';

// // Initialize the OpenAI client with your API key
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const runtime = 'edge';

// export async function POST(req: Request) {
//   try {
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     // Create a completion request to the OpenAI API
//     const response = await openai.completions.create({
//       model: 'gpt-3.5-turbo-instruct',
//       max_tokens: 400,
//       stream: true,
//       prompt,
//     });

//     // Convert the OpenAI response stream to a readable stream
//     const stream = OpenAIStream(response);

//     // Return the stream as a text response
//     return new Response(stream);
//   } catch (error) {
//     if (error instanceof OpenAI.APIError) {
//       // Handle OpenAI API errors
//       const { name, status, headers, message } = error;
//       return NextResponse.json({ name, status, headers, message }, { status });
//     } else {
//       // Handle general errors
//       console.error('An unexpected error occurred:', error);
//       return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

// // Function to create a readable stream from OpenAI response
// function OpenAIStream(response: any): Readable {
//   const readable = new Readable({
//     read() {
//       // Simulate streaming data from the OpenAI API
//       this.push('What’s a hobby you’ve recently started?||');
//       this.push('If you could have dinner with any historical figure, who would it be?||');
//       this.push('What’s a simple thing that makes you happy?');
//       this.push(null); // Signal the end of the stream
//     },
//   });

//   return readable;
// }
