import Scene from '@/components/Scene';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">React Three Fiber in Next.js</h1>
      <Scene />
    </main>
  );
}