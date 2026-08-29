import { LoginForm } from '@/components/admin/LoginForm';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <h1 className="m-0 text-[21px] font-semibold tracking-[-0.02em]">Admin</h1>
        <p className="text-text-5 mt-2 mb-7 text-[15px] leading-[1.6]">
          Enter the code to edit the site.
        </p>
        <LoginForm next={next ?? ''} />
      </div>
    </div>
  );
}
