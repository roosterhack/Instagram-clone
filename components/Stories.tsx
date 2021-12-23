import { useEffect, useState } from "react";
import faker from "faker";
import { Story } from "./Story";
import { useSession } from "next-auth/react";

export const Stories = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.createCard(),
      avatar: `https://picsum.photos/100/100?random=${i}`,
      id: i,
    }));
    setSuggestions(suggestions);
    console.log(suggestions);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thumb-black scrollbar-thin mt-8">
      {session && (
        <Story img={session?.user?.image} username={session?.user?.name} />
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
};
