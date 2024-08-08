import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ id, label, error, ...props }) => (
  <div className="mb-4">
    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-zinc-400">
      {label}
    </label>
    <input
      id={id}
      name={id}
      className={`w-full rounded-md border ${
        error ? 'border-red-500' : 'border-zinc-700'
      } bg-zinc-900 px-3 py-2 text-zinc-200 placeholder-zinc-500 ring-1 ring-transparent transition-all focus:outline-none focus:ring-2 ${
        error ? 'focus:ring-red-500' : 'focus:ring-blue-700'
      }`}
      {...props}
    />
    {error && (
      <p className="mt-1 text-sm text-red-500">{error}</p>
    )}
  </div>
);
