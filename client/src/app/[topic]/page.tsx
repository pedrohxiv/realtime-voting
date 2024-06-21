import { redis } from "@/lib/redis";

import { ClientPage } from "./_components/client-page";

interface Props {
  params: { topic: string };
}

const TopicPage = async ({ params }: Props) => {
  const initialData = await redis.zrange(`room:${params.topic}`, 0, 49, {
    withScores: true,
  });

  const words: { text: string; value: number }[] = [];

  for (let i = 0; i < initialData.length; i++) {
    const [text, value] = initialData.slice(i, i + 2);

    if (typeof text === "string" && typeof value === "number") {
      words.push({ text, value });
    }
  }

  await redis.incr("served-requests");

  return <ClientPage initialData={words} topicName={params.topic} />;
};

export default TopicPage;
