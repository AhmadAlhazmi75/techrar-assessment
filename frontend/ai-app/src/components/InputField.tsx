export const InputField = ({ id, label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <div className="mb-3">
      <label htmlFor={id} className="mb-1.5 block text-zinc-400">
        {label}
      </label>
      <input
        id={id}
        name={id}
        className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
        required
        {...props}
      />
    </div>
  );
