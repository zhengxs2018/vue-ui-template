import { config } from "../config";

// TODO 需要支持局部 ConfigProvider 的变更
export function useNamespace(name: string) {
  const block = () => `${config.namespace}${config.bem.namespace}${name}`;

  const element = (element?: string | boolean) =>
    element ? `${block()}${config.bem.element}${element}` : "";

  const modifier = (modifier?: string | boolean) =>
    modifier ? `${block()}${config.bem.modifier}${modifier}` : "";

  const is = (state: string, real?: boolean) => (real ? `is-${state}` : "");

  return {
    block,
    b: block,
    element,
    e: element,
    modifier,
    m: modifier,
    is,
  };
}
