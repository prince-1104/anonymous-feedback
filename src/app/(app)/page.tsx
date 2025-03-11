"use client";

import { Mail } from "lucide-react"; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>

        {/* Render Carousel only when mounted */}
        {isMounted && (
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
                    <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                      <Mail className="flex-shrink-0" />
                      <div>
                        <p>{message.content}</p>
                        <p className="text-xs text-muted-foreground">
                          {message.received}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        <div className="container mx-auto">
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>

          <div className="flex flex-wrap justify-center items-center gap-4 text-sm md:text-base">
            <p>
              Email:{" "}
              <a
                href="mailto:princeprasad.dr@gmail.com"
                className="text-blue-400 hover:underline"
              >
                princeprasad.dr@gmail.com
              </a>
            </p>
            <span className="hidden md:inline">|</span>
            <p>
              Phone:{" "}
              <a
                href="tel:+919007174936"
                className="text-blue-400 hover:underline"
              >
                +91 9007174936
              </a>
            </p>
            <span className="hidden md:inline">|</span>
            <p>Address: 131, CR Avenue, Near MG Road</p>
          </div>

          {/* Social Links */}
          <div className="mt-2 flex justify-center">
            <a
              href="https://www.linkedin.com/in/prince1104"
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
