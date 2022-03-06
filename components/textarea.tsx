interface TextareaProps {
  label?: string;
  name?: string;
  [key: string]: any;
}

export default function Textarea({ label, name, ...rest }: TextareaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 "
        rows={4}
        name={name}
        {...rest}
      />
    </div>
  );
}
