"use server";

import { redirect } from "next/navigation";

import { redis } from "@/lib/redis";
import { wordFrequency } from "@/lib/utils";

interface CreateTopicProps {
  topicName: string;
}

interface SubmitCommentProps {
  comment: string;
  topicName: string;
}

export const createTopic = async ({ topicName }: CreateTopicProps) => {
  const regex = /^[a-zA-Z-]+$/;

  if (!topicName || topicName.length > 50) {
    return { error: "Name must be between 1 and 50 chars" };
  }

  if (!regex.test(topicName)) {
    return { error: "Only letters and hyphens allowed in name" };
  }

  await redis.sadd("existing-topics", topicName);

  return redirect(`/${topicName}`);
};

export const submitComment = async ({
  comment,
  topicName,
}: SubmitCommentProps) => {
  const words = wordFrequency(comment);

  await Promise.all(
    words.map(
      async (word) =>
        await redis.zadd(
          `room:${topicName}`,
          { incr: true },
          { member: word.text, score: word.value }
        )
    )
  );

  await redis.incr("served-requests");

  await redis.publish(`room:${topicName}`, words);

  return comment;
};
