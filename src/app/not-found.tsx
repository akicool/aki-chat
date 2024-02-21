import Link from "next/link";

export default function NotFound() {
  return (
    <div className=" grid h-screen w-full place-items-center">
      <div className="flex flex-col items-center gap-2">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
