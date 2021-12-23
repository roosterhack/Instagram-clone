import Head from "next/head";
import { Feed } from "../components/Feed";
import { Modal } from "../components/Modal";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Edstagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <Navbar />
      {/* Feed */}
      <Feed />
      {/* Modal */}
      <Modal />
    </div>
  );
}
