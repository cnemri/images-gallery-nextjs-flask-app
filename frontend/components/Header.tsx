import React from "react";
import Logo from "./Logo";

type Props = {};

const Header = ({}: Props) => {
  return (
    <div className="p-4 bg-stone-100 text-lg font-semibold">
      <Logo />
    </div>
  );
};

export default Header;
