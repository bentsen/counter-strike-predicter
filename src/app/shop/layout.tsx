import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col px-[40px]">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
