import Head from "next/head";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Edstagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <Navbar />
      {/* Feed */}

      {/* Modal */}
    </div>
  );
}
