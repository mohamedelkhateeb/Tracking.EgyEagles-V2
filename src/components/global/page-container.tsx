import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PageContainer({
  children,
  scrollable = false,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)]">
          <div>{children}</div>
        </ScrollArea>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
}
