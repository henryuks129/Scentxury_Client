export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 px-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
