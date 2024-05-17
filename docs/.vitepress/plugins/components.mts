import path from "node:path";
import glob from "fast-glob";
import type { Plugin } from "vite";

type Append = Record<"headers" | "footers" | "scriptSetups", string[]>;

let compPaths: string[];

export type ComponentsOptions = {
  root: string;
  include: string | string[];
};

export function components(options: ComponentsOptions): Plugin {
  return {
    name: "doc-components",

    enforce: "pre",

    async buildStart() {
      console.log('options.root', options.root)
      compPaths = await glob(options.include, {
        cwd: options.root,
        absolute: true,
        onlyDirectories: true,
      });
    },

    async transform(code, id) {
      if (!id.endsWith(".md") || !id.startsWith(options.root)) return;

      const componentId = path.basename(id, ".md");

      const append: Append = {
        headers: [],
        footers: [],
        scriptSetups: [
          `const demos = import.meta.glob('../examples/${componentId}/*.vue', { eager: true })`,
        ],
      };

      code = transformVpScriptSetup(code, append);

      return combineMarkdown(
        code,
        [combineScriptSetup(append.scriptSetups), ...append.headers],
        append.footers
      );
    },
  };
}

const combineScriptSetup = (codes: string[]) =>
  `\n<script setup>
${codes.join("\n")}
</script>
`;

const combineMarkdown = (
  code: string,
  headers: string[],
  footers: string[]
) => {
  const frontmatterEnds = code.indexOf("---\n\n");
  const firstHeader = code.search(/\n#{1,6}\s.+/);
  const sliceIndex =
    firstHeader < 0
      ? frontmatterEnds < 0
        ? 0
        : frontmatterEnds + 4
      : firstHeader;

  if (headers.length > 0)
    code =
      code.slice(0, sliceIndex) + headers.join("\n") + code.slice(sliceIndex);
  code += footers.join("\n");

  return `${code}\n`;
};

const vpScriptSetupRE =
  /<vp-script\s(.*\s)?setup(\s.*)?>([\s\S]*)<\/vp-script>/;

const transformVpScriptSetup = (code: string, append: Append) => {
  const matches = code.match(vpScriptSetupRE);
  if (matches) code = code.replace(matches[0], "");
  const scriptSetup = matches?.[3] ?? "";
  if (scriptSetup) append.scriptSetups.push(scriptSetup);
  return code;
};
