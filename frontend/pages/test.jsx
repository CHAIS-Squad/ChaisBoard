import Draw from "@/components/draw";

export default function Test() {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="bg-green-200 w-1/2 h-dvh"></div>
        <div className="bg-blue-200 w-1/2 h-dvh">
          <Draw />
        </div>
      </div>
      <div className="flex">
        <div className="bg-green-200 w-1/2 h-dvh"></div>
        <div className="bg-blue-200 w-1/2 h-dvh">
          <Draw />
        </div>
      </div>
    </div>
  );
}
