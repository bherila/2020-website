import * as React from "react";

export interface TypographyProps {
  children: React.ReactNode;
  variant?: string;
  component?: string;
  py?: string |number;
}

export default function Typography(props: TypographyProps) {
  return <div>{props.children}</div>
}
