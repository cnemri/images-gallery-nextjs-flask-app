import Image from "next/image";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return <Image src="/logo.svg" alt="Logo" width={250} height={250} />;
};

export default Logo;
