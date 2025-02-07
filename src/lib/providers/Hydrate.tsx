"use client";

import { HydrationBoundary, DehydratedState } from "@tanstack/react-query";

interface Props {
  state?: DehydratedState; 
  children: React.ReactNode;
}

export default function Hydrate({ state = { mutations: [], queries: [] }, children }: Props) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
