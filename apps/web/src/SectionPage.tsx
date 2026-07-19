import { Link } from "react-router-dom";
import { NavBar } from "./NavBar";

type SectionPageProps = {
  title: string;
  description: string;
};

export function SectionPage({ title, description }: SectionPageProps) {
  return (
    <main className="min-h-screen bg-[#f6f7f2] px-4 pb-6 pt-24 text-[#172033] sm:px-6 lg:px-8 lg:pb-8 lg:pt-28">
      <NavBar />
      <div className="mx-auto w-full max-w-7xl">
        <Link
          to="/dashboard"
          className="inline-flex rounded-md px-2 py-1 font-semibold text-[#2f6f63] hover:bg-[#e8f0eb] focus:outline-none focus:ring-2 focus:ring-[#2f6f63] focus:ring-offset-2"
        >
          ← Back to dashboard
        </Link>
        <section className="mt-6 rounded-lg border border-[#d7ded2] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase text-[#2f6f63]">HomeHub</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-2xl leading-7 text-[#4d5768]">{description}</p>
        </section>
      </div>
    </main>
  );
}
