import { Star } from "lucide-react";

import { Icons } from "@/components/icons";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { TopicCreator } from "@/components/topic-creator";
import { redis } from "@/lib/redis";

const RootPage = async () => {
  const servedRequests = await redis.get("served-requests");

  return (
    <section className="min-h-screen bg-grid-zinc-50">
      <MaxWidthWrapper className="relative pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-52">
        <div className="hidden lg:block absolute inset-0 top-8"></div>
        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="relative mx-auto text-center flex flex-col items-center">
            <h1 className="relative leading-snug w-fit tracking-tight text-balance mt-16 font-bold text-gray-900 text-5xl md:text-6xl">
              What do you{" "}
              <span className="whitespace-nowrap">
                th
                <span className="relative">
                  i
                  <span className="absolute inset-x-0 -top-2 -translate-x-3">
                    <Icons.brain className="size-7 md:size-8" />
                  </span>
                </span>
                nk
              </span>{" "}
              about...
            </h1>
            <TopicCreator />
            <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="flex flex-col gap-1 justify-between items-center sm:items-start">
                <div className="flex gap-0.5">
                  <Star className="size-4 text-green-600 fill-green-600" />
                  <Star className="size-4 text-green-600 fill-green-600" />
                  <Star className="size-4 text-green-600 fill-green-600" />
                  <Star className="size-4 text-green-600 fill-green-600" />
                  <Star className="size-4 text-green-600 fill-green-600" />
                </div>
                <p>
                  <span className="font-semibold">
                    {Math.ceil(Number(servedRequests) / 10) * 10}
                  </span>{" "}
                  served requests
                </p>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default RootPage;
