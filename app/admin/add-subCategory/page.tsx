"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const page = () => {
  const [categories, setCategories] = React.useState<any>([]);
  const [subCategories, setSubCategories] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  console.log(categories);

  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
    },
  });
  console.log(form.watch());

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
    axiosInstance
      .get("/api/subcategories")
      .then((res) => {
        setSubCategories(res.data.data.subcategories);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const onSubmit = async (values: { name: string }) => {
    await axiosInstance.post("/api/subcategories", values);
  };

  return (
    <>
      {loading ? (
        <>loading ...</>
      ) : (
        <div>
          {subCategories.map((cat: any) => (
            <p className="font-bold">{cat.name}</p>
          ))}
        </div>
      )}
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p>add category</p>
        <input className="border rounded" {...form.register("name")} />
        <Controller
          control={form.control}
          name="category"
          render={({ field }) => {
            return (
              <select className="border rounded" defaultValue={""} {...field}>
                <option value={""}>select category</option>
                {categories.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            );
          }}
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default page;
