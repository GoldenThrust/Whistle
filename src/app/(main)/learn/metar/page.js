import Image from "next/image";
import Articles from "@/components/Articles";

export default function METARLearnPage() {
  return (
    <>
      <Articles />
      <div className='m-3 md:ms-10'>
        <h1 className="font-bold text-2xl">METAR/SPECI/TAF</h1>
        <h2>What is METAR</h2>
      </div>
    </>
  );
}
