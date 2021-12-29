import Head from "next/head";
import { Feed } from "../components/Feed";
import { PostModal } from "../components/PostModal";
import { Navbar } from "../components/Navbar";
import { usePosts } from "../hooks/usePosts";
import { useEffect, useState } from "react";

export default function Home() {
  const { posts } = usePosts();
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (posts) setFilteredPosts(posts);
  }, [posts]);

  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Edstagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <Navbar setFilteredPosts={setFilteredPosts} posts={posts} />
      {/* Feed */}
      <Feed filteredPosts={filteredPosts} />
      {/* Modal */}
      <PostModal />
    </div>
  );
}
