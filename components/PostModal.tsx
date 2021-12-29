import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export const PostModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const [caption, setCaption] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const notReady = !selectedFile || !caption;

  const uploadPost = async () => {
    if (loading || notReady) return;

    setLoading(true);

    //Create a post and add to firestore 'posts' collection
    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption,
      profileImg: session.user?.image,
      timestamp: serverTimestamp(),
    });

    // get the post ID for the newly cerated post

    // upload the image to firebase storage with the post ID
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        // get a download URL from fb storage and update the orignal post with the image link
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), { image: downloadURL });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
    setCaption(null);
  };

  const addImageToPost = (e: any) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent: any) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        onClose={setOpen}
        className="fixed z-10 inset-0 overscroll-y-auto"
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    alt=""
                    onClick={() => setSelectedFile(null)}
                    className="w-full object-contain cursor-pointer"
                  />
                ) : (
                  <div
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 cursor-pointer"
                    onClick={() => filePickerRef.current.click()}
                  >
                    <CameraIcon
                      className="h-6 w-6 text-blue-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>

              <div className="mt-3 sm:mt-5">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  Upload a photo
                </Dialog.Title>
              </div>

              <div>
                <input
                  type="file"
                  hidden
                  ref={filePickerRef}
                  onChange={addImageToPost}
                />
              </div>

              <div className="mt-2">
                <input
                  type="text"
                  className="border-none focus:ring-0 w-full text-center"
                  placeholder="Please enter a caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>

              <div className="mt-5 sm:mt-6">
                <button
                  disabled={loading || notReady}
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 w-full disabled:opacity-20"
                  onClick={uploadPost}
                >
                  {loading ? <div className="loader"></div> : "Upload Post"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
