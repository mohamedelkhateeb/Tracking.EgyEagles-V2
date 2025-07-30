import GlobalLoader from "@/components/global/global-loader";
import { ReactNode, Suspense } from "react";

type QueryLoadingBoundaryProps = {
  children: ReactNode;
};

export const QueryLoadingBoundary = ({
  children,
}: QueryLoadingBoundaryProps) => {
  return <Suspense fallback={<GlobalLoader />}>{children}</Suspense>;
};
