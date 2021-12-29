import { Post } from "./Post";

export const Posts = ({ filteredPosts }) => {
  return (
    <div>
      {filteredPosts &&
        filteredPosts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};
