export interface UIConfiguration {
  namespace: string;
  bem: {
    namespace: string;
    element: string;
    modifier: string;
    state: string;
  };
}

export const config: UIConfiguration = {
  namespace: "le",
  bem: {
    namespace: "-",
    element: "__",
    modifier: "--",
    state: "-",
  },
};
