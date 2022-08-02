import { cls } from "@libs/client/utils";

interface MessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string;
}

export default function Message({
  message,
  avatarUrl,
  reversed,
}: MessageProps) {
  return (
    <div
      className={cls(
        "flex  items-start space-x-2",
        reversed ? "flex-row-reverse  space-x-reverse" : ""
      )}
    >
      <div className="h-8 w-8 rounded-full bg-slate-400" />
      <div className="my-0.5 rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-700">
        <p>{message}</p>
      </div>
    </div>
  );
}
