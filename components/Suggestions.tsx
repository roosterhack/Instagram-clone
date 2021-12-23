import { useEffect, useState } from "react";
import faker from "faker";

export const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.createCard(),
      avatar: `https://picsum.photos/80/80?random=${i}`,
      id: i,
    }));

    setSuggestions(suggestions);
  }, []);

  console.log(suggestions);
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm text-gray-400 font-bold">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>

      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            src={profile.avatar}
            alt={profile.username}
            className="w-10 h-10 rounded-full border p-[2px]"
          />
          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{profile.username}</h2>
            <h3 className="text-gray-400 text-xs">
              {profile.accountHistory[0].business}
            </h3>
          </div>
          <button className="text-blue-400 text-xs">Follow</button>
        </div>
      ))}
    </div>
  );
};
