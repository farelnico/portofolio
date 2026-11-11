import LinkButton from '@/components/Button';

export default function NotFound() {
  return (
    <section className="grid min-h-[100svh] place-items-center px-6 text-center">
      <div>
        <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">Page not found</h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-mist">That page doesn&apos;t exist or has moved. Head back to the portfolio to keep browsing.</p>
        <div className="mt-10 flex justify-center gap-3">
          <LinkButton href="/portfolio">Open portfolio</LinkButton>
          <LinkButton href="/" variant="ghost">Go home</LinkButton>
        </div>
      </div>
    </section>
  );
}
