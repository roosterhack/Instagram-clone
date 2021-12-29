import { Popover, Transition } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

export const PopoverMenu = ({ postId }: { postId: string }) => {
  const deletePost = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
  };

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button>
            <DotsHorizontalIcon className="h-5" />
          </Popover.Button>

          {/* Use the Transition component. */}
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            {/* Mark this component as `static` */}
            <Popover.Panel className="absolute z-10 max-w-xs px-4  transform -translate-x-1/2 left-1/2 sm:left-1/3 sm:px-1 lg:max-w-3xl min-w-fit">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4 bg-gray-50 cursor-pointer">
                  <span
                    onClick={() => {
                      deletePost(postId);
                      close();
                    }}
                  >
                    delete
                  </span>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
