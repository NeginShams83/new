"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const [categories, setCategories] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  console.log(categories);

  const form = useForm({
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/api/categories")
      .then((res) => {
        setCategories(res.data.data.categories);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const onSubmit = async (values: { name: string }) => {
    await axiosInstance.post("/api/categories", values);
  };

  return (
    <>
      {loading ? (
        <>loading ...</>
      ) : (
        <div>
          {categories.map((cat: any) => (
            <p className="font-bold">{cat.name}</p>
          ))}
        </div>
      )}
      <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
        <p>add category</p>
        <input className="border rounded" {...form.register("name")} />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default page;
