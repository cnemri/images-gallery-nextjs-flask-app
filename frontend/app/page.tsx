"use client";

import React from "react";
import Header from "@/components/Header";
import Search from "@/components/Search";
import ImageCard from "@/components/ImageCard";
import Welcome from "@/components/Welcome";
import axios from "axios";
import Loader from "@/components/Loader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

export default function Home() {
  const [search, setSearch] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/new-image?query=${search}`);
      const data = await res.data;
      setImages([{ ...data, title: search }, ...images]);
      toast.success("Image added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, image not added");
    } finally {
      setSearch("");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const res = await axios.delete(`${API_URL}/images/${id}`);
      const deletedId = await res.data;
      setImages(images.filter((image) => image.id !== deletedId.deleted_id));
      toast.warning("Image deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, image not deleted");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (id: string) => {
    const imageToSave = images.find((image) => image.id === id);
    imageToSave.saved = true;
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/images`, { ...imageToSave });
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        );
      }
      toast.success("Image saved successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, image not saved");
    } finally {
      setLoading(false);
    }
  };

  const getSavedImages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/images`);
      const data = await res.data;
      setImages(data || []);
      toast.success("Images loaded successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, images not loaded");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getSavedImages();
  }, []);

  return (
    <div>
      <div className="top-0 right-0 left-0 z-10 fixed">
        <Header />
        <div className="bg-gradient-to-b from-white via-80% via-white to-transparent">
          <Search
            search={search}
            setSearch={setSearch}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-5 pt-40">
        {loading && <Loader />}
        {!loading && images.length === 0 ? (
          <Welcome />
        ) : (
          images.map((image, index) => (
            <ImageCard
              key={index}
              image={image}
              onDelete={() => handleDelete(image.id)}
              onSave={() => handleSave(image.id)}
            />
          ))
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
