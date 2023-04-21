import {getMDXComponent} from 'mdx-bundler/client';
import {bundleMDX} from 'mdx-bundler'
import {useMemo} from 'react';

export default function TestCodeExecution({ code, frontmatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <>
      <Component />
    </>
  );
}

export async function getServerSideProps() {
  const mdxSource = `
---
title: Sorting Algorithms
description: A basic description of the "bubbe sort" algorithm
---

# Bubble sort
Bubble sort is pretty cool. I'm not going to write about how it works, but here's an interactive component.

import Demo from './demo'

<Demo />
  `.trim();

  const result = await bundleMDX({
    source: mdxSource,
    files: {
      './demo.tsx': `
import { useState } from 'react'

function Demo() {
  const [list, setList] = useState([9, 3, 1, 5, 7, 2, 6, 4, 6, 1, 5, 10]);
  const [offset, setOffset] = useState(0);

  function incrementOffset() {
    setOffset((offset + 1) % (list.length - 1));
  }

  function click() {
    if (list[offset] > list[offset + 1]) {
      let temp = list[offset];
      list[offset] = list[offset + 1];
      list[offset + 1] = temp;
    }

    incrementOffset();
  }

  return (
    <>
      <p>The list: </p>
      <div style={{display: "flex"}}>
        {list.map((x, i) => <p
          key={i}
          style={{
            color: (i == offset) ?
              ((list[i] <= list[i + 1]) ? "green" : "red") :
              ((i == offset + 1) ?
                ((list[i - 1] <= list[i]) ? "green" : "red") :
                "white"),
            marginRight: "10px"
          }}>
            {x}
          </p>)}
      </div>
      <button onClick={click}>Go forward</button>
    </>
  )
}

export default Demo
      `,
    },
  })

  const {code, frontmatter} = result;

  return {
    props: {
      code, frontmatter
    }
  };
}
