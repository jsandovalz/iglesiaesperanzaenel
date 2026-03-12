"use client";
import Link from "next/link";

export default function BibliaButton() {
  return (
    <Link
      href="/biblia"
      className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition"
    >
      📖 Biblia
    </Link>
  );
}