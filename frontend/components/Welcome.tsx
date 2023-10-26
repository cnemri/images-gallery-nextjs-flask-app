import React from "react";
import { Button } from "./ui/button";

type Props = {};

const Welcome = (props: Props) => {
  return (
    <div className="p-10 bg-stone-200 space-y-8 rounded-lg">
      <h1 className="text-2xl font-bold">Images Gallery</h1>
      <p className="max-w-4xl">
        This is a simple application that retrieves photos using Unsplash API.
        In order to start, enter any search term in the input field
      </p>
      <Button className="w-24 bg-blue-500 text-white">Learn More</Button>
    </div>
  );
};

export default Welcome;
