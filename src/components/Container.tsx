import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="container mx-auto">{children}</div>;
};

export default Container;
