"use client";
import React from "react";

export default function GlobalError({ error }: any) {
  return (
    <div style={{padding:16}}>
      <h2>Something went wrong</h2>
      <pre style={{whiteSpace:'pre-wrap'}}>{String(error?.message ?? error)}</pre>
    </div>
  );
}
