import { Button } from "@/components/ui/button";
import { Book, Wrench } from "lucide-react";
import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Build Forms in Minutes,
              <strong className="font-extrabold text-purple-700 sm:block">
                {" "}
                Not Hours
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Effortlessly create custom forms with drag-and-drop simplicity. No
              coding required!
            </p>

            <div className="mt-8 flex flex-col lg:flex-row flex-wrap justify-center gap-4">
              <Link href="/">
                <Button className="flex items-center gap-2 w-full lg:w-[15rem]">
                  <Wrench className="w-4 h-4" />
                  Create form
                </Button>
              </Link>
              <Link href="/">
                <Button
                  className="flex items-center gap-2 w-full lg:w-[15rem]"
                  variant="outline"
                >
                  <Book className="w-4 h-4" />
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
