import Image from "next/image";
import React from "react";

type Props = {};

const Loader = (props: Props) => {
  return (
    <Image
      src="/loader.svg"
      alt="loader"
      width={250}
      height={250}
      className="invert"
    />
  );
};

export default Loader;
