import { PropsWithChildren } from "react";

export default function CreateLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
