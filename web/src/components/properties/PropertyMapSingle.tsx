"use client";

import dynamic from "next/dynamic";

const Inner = dynamic(() => import("./PropertyMapSingleInner").then((m) => m.PropertyMapSingleInner), {
  ssr: false,
  loading: () => <div className="h-full rounded-2xl bg-mist" />,
});

export function PropertyMapSingle(props: { latitude: number; longitude: number; name: string }) {
  return <Inner {...props} />;
}
