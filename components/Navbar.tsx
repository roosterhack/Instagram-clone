import Image from "next/image";
import {
  SearchIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { HomeIcon, MenuIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { useState } from "react";

export const Navbar = ({ setFilteredPosts, posts }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    const filtered = posts.filter((post) =>
      post.data().caption.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
        {/* logo */}
        <div
          className="relative w-24 hidden lg:inline-grid"
          onClick={() => router.push("/")}
        >
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div
          className="relative w-10 lg:hidden cursor-pointer flex-shrink-0"
          onClick={() => router.push("/")}
        >
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* search */}
        <div>
          <div className="mt-1 relative p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm rounded-md border-gray focus:border-black focus:ring-black border-gray-300"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* nav */}

        <div className="flex justify-end items-center space-x-4">
          <HomeIcon className="navButton" onClick={() => router.push("/")} />
          {session ? (
            <>
              <MenuIcon className="md:hidden h-6 cursor-pointer" />
              <div className="relative navButton">
                <PaperAirplaneIcon className="navButton" />
                <div className="absolute -top-2 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white animate-pulse">
                  2
                </div>
              </div>
              <PlusCircleIcon
                className="navButton"
                onClick={() => setOpen(true)}
              />
              <UserGroupIcon className="navButton" />
              <HeartIcon className="navButton" />

              <img
                onClick={signOut as () => void}
                src={session?.user?.image}
                alt="profile pic"
                className="rounded-full cursor-pointer h-10 w-10"
              />
            </>
          ) : (
            <button onClick={signIn as () => void}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
};
