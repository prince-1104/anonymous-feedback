"use client";

import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

// interface Message {
//   title: string;
//   content: string;
//   received: string;
// }

export default function Home() {
  return (
    <>
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Feedback — Where your identity remains a secret.
          </p>
        </section>

        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-start gap-4">
                    <Mail className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

     
      <footer className="text-center p-6 bg-gray-900 text-white">
  <div className="flex flex-col md:flex-row justify-center items-center gap-4">
    <a
      href="https://feedback.doptonin.in/u/Prince"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-transform transform hover:scale-105"
    >
      Feedback to Admin
    </a>

    <a
      href="https://www.linkedin.com/in/prince1104/"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition-transform transform hover:scale-105"
    >
      LinkedIn
    </a>
  </div>
</footer>

    </>
  );
}