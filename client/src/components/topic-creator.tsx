"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { createTopic } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const TopicCreator = () => {
  const [input, setInput] = useState<string>("");

  const { mutate, error, isPending } = useMutation({
    mutationFn: createTopic,
  });

  return (
    <div className="mt-12 flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          className="bg-white min-w-64"
          placeholder="Enter topic here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isPending}
        />
        <Button
          onClick={() => mutate({ topicName: input })}
          disabled={isPending}
        >
          Create
        </Button>
      </div>
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
