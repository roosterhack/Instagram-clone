interface StoryProps {
  username: string;
  img: string;
}

export const Story = ({ username, img }: StoryProps) => {
  return (
    <div>
      <img
        className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 ease-out transition transform duration-200"
        src={img}
        alt={username}
      />
      <p className="text-xs w-14 truncate text-center mt-1">{username}</p>
    </div>
  );
};
