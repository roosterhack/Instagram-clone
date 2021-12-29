import {
  BookmarkIcon,
  ChatIcon,
  HeartIcon,
  PaperAirplaneIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFill } from "@heroicons/react/solid";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../firebase";
import { PopoverMenu } from "./Popover";

interface PostProps {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}

export const Post = ({ post }: any) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[] | null>([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", post.id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", post.id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, post.id]
  );

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", post.id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", post.id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", post.id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="border rounded-sm my-7 bg-white">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={post.data().profileImg}
          className="rounded-full w-12 h-12 object-contain border p-1 mr-3"
          alt={post.data().username}
        />
        <p className="flex-1 font-bold">{post.data().username}</p>
        {/* <DotsHorizontalIcon className="h-5" /> */}
        <PopoverMenu postId={post.id} />
      </div>
      {/* img */}
      <img src={post.data().image} alt="" className="object-contain w-full" />

      {/* buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFill onClick={likePost} className="btn text-red-500" />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/* comments */}
      <div>
        <p className="p-5 truncate">
          {likes.length > 0 && (
            <p className="font-bold mb-1">
              {likes.length} like{likes.length > 1 && "s"}
            </p>
          )}
          <span className="font-bold mr-1">{post.data().username}</span>
          {post.data().caption}
        </p>
      </div>

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment: any) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                src={comment.data().userImage}
                alt={comment.data().username}
                className="h-7 rounded-full"
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            placeholder="comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="font-semibold text-blue-400"
            type="submit"
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};
