import fs from "node:fs";
import path from "node:path";
import { type MarkdownRenderer } from "vitepress";

import container from "markdown-it-container";
import type { RenderRule } from "markdown-it/lib/renderer.mjs";

type ContainerArgs = [
  typeof container,
  string,
  {
    validate(params: string): boolean;
    render: RenderRule;
  }
];

type ContainerOptions = {
  root: string;
};

export const createDemoContainer = (
  md: MarkdownRenderer,
  opts: ContainerOptions
): ContainerArgs => {
  return [
    container,
    "demo",
    {
      validate(params) {
        return !!params.trim().match(/^demo\s*(.*)$/);
      },

      render(tokens, idx) {
        const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
        if (tokens[idx].nesting === 1 /* means the tag is opening */) {
          const description = m && m.length > 1 ? m[1] : "";
          const sourceFileToken = tokens[idx + 2];
          const sourceFile = sourceFileToken.children?.[0].content ?? "";

          let source = "";
          if (sourceFileToken.type === "inline") {
            source = fs.readFileSync(
              path.resolve(opts.root, `${sourceFile}.vue`),
              "utf-8"
            );
          }
          if (!source) throw new Error(`Incorrect source file: ${sourceFile}`);

          return `<vp-demo :demos="demos" path="${sourceFile}">
          <template #description> ${md.render(description)} </template>
          <template #source> ${md.render(
            "```vue\n" + source + "```"
          )} </template>`;
        }

        return "</vp-demo>";
      },
    },
  ];
};
