"use client";

import { useMutation } from "@tanstack/react-query";
import { scaleLog } from "@visx/scale";
import { Text } from "@visx/text";
import { Wordcloud } from "@visx/wordcloud";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { submitComment } from "@/actions";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const socket = io("http://localhost:8080");

const COLORS = ["#143059", "#2F6B9A", "#82A6C2"];

interface Props {
  initialData: { text: string; value: number }[];
  topicName: string;
}

export const ClientPage = ({ initialData, topicName }: Props) => {
  const [words, setWords] =
    useState<{ text: string; value: number }[]>(initialData);
  const [input, setInput] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: submitComment,
  });

  const router = useRouter();

  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((word) => word.value)),
      Math.max(...words.map((word) => word.value)),
    ],
    range: [10, 100],
  });

  useEffect(() => {
    socket.emit("join-room", `room:${topicName}`);
  }, []);

  useEffect(() => {
    socket.on("room-update", (message: string) => {
      const data = JSON.parse(message) as { text: string; value: number }[];

      data.map((newWord) => {
        const isWordAlreadyIncluded = words.some(
          (word) => word.text === newWord.text
        );

        if (isWordAlreadyIncluded) {
          setWords((prev) => {
            const before = prev.find((word) => word.text === newWord.text);
            const rest = prev.filter((word) => word.text !== newWord.text);

            return [
              ...rest,
              { text: before!.text, value: before!.value + newWord.value },
            ];
          });
        } else if (words.length < 50) {
          setWords((prev) => [...prev, newWord]);
        }

        router.refresh();
      });
    });

    return () => {
      socket.off("room-update");
    };
  }, [words]);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-grid-zinc-50 pb-20">
      <MaxWidthWrapper className="flex flex-col items-center gap-6 pt-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-center tracking-tight text-balance">
          What people think about{" "}
          <span className="text-blue-600">{topicName}</span>:
        </h1>
        <p className="text-sm">(updated in real-time)</p>
        <div className="aspect-square max-w-xl flex items-center justify-center">
          <Wordcloud
            words={words}
            width={500}
            height={500}
            fontSize={(data) => fontScale(data.value)}
            font="Impact"
            padding={2}
            spiral="archimedean"
            rotate={0}
            random={() => 0.5}
          >
            {(cloudWords) =>
              cloudWords.map((word, i) => (
                <Text
                  key={word.text}
                  fill={COLORS[i % COLORS.length]}
                  textAnchor="middle"
                  transform={`translate(${word.x}, ${word.y})`}
                  fontSize={word.size}
                  fontFamily={word.font}
                >
                  {word.text}
                </Text>
              ))
            }
          </Wordcloud>
        </div>
        <div className="max-w-lg w-full">
          <Label className="font-semibold tracking-tight text-lg pb-2">
            Here&apos;s what I think about {topicName}
          </Label>
          <div className="mt-1 flex gap-2 items-center">
            <Input
              placeholder={`${topicName} is absolutely...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isPending}
            />
            <Button
              onClick={() => mutate({ comment: input, topicName })}
              disabled={isPending}
            >
              Share
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
