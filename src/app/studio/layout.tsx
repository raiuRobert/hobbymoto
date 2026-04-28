export const dynamic = "force-dynamic";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
