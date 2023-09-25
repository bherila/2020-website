import * as React from "react";

export default function Container(props: {children?: React.ReactNode}): React.ReactElement {
  return <div>{props.children}</div>
}
