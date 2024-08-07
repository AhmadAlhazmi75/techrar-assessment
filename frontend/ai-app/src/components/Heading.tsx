import Link from 'next/link';


export const Heading = ({signin}: {signin: boolean}) => (
    <div className="mb-9 mt-6 space-y-1.5 text-center">
      <h1 className="text-2xl font-semibold">{signin ? "Create your account" : "Sign in"}</h1>
      <p className="text-zinc-400">
        {signin ? "Already have an account? " : "Don't have an account? "}
        <Link href={signin ? "/login" : "/register"} className="text-blue-400">
          {signin ? "Sign in." : "Create an account."}
        </Link>
      </p>
    </div>
  );
