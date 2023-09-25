import * as React from "react";

export default function Button(props: {children?: React.ReactNode, size: string}): React.ReactElement {
  return <div>{props.children}</div>
}
