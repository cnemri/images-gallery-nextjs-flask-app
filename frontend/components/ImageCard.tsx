import React, { MouseEventHandler } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

type Props = {
  image: {
    urls: {
      small: string;
    };
    title: string;
    description?: string;
    alt_description?: string;
    saved?: boolean;
  };
  onDelete: MouseEventHandler<HTMLButtonElement>;
  onSave: MouseEventHandler<HTMLButtonElement>;
};

const ImageCard = ({ image, onDelete, onSave }: Props) => {
  return (
    // add scroll overflow
    <Card className="shadow-xl">
      <CardHeader className="justify-center items-center w-[250px] space-y-4">
        <div className="h-[150px] w-[150px] rounded-full overflow-hidden border-2">
          <Image
            src={image.urls.small}
            alt="Image"
            width={200}
            height={200}
            className="rounded-xl w-[200px] h-[200px] object-cover overflow-hidden"
          />
        </div>

        <CardTitle className="capitalize">{image.title}</CardTitle>
        <CardDescription className="h-[50px] overflow-scroll">
          {image.description || image.alt_description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="space-x-10">
        <Button onClick={onDelete} variant="destructive">
          Delete
        </Button>
        {!image.saved && (
          <Button className="w-full bg-blue-500 text-white" onClick={onSave}>
            Save
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
