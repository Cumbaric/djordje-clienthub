// Test stub for next/link: a plain anchor.
import React from "react";

export default function Link({ href, children, ...rest }) {
  return (
    <a href={typeof href === "string" ? href : "#"} {...rest}>
      {children}
    </a>
  );
}
