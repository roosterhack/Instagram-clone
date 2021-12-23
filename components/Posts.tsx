import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Post } from "./Post";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return <div>{posts && posts.map((post) => <Post post={post} />)}</div>;
};
