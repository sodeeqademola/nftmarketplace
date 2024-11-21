"use client";
import { ethers } from "ethers";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { z } from "zod";
import { File } from "@web-std/file";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { CreateItem } from "@/Utils/Querries";
import { useRouter } from "next/navigation";

// form schema
const formSchema = z.object({
  title: z.string().min(2, "not less than 2 chars"),
  description: z.string().min(2, "not less than 2 chars"),
  price: z.string(),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 1024 * 1024 * 2,
      "size should not be more than 2 mb"
    )
    .refine((file) => file.type.startsWith("image/"), {
      message: "file name should start with image",
    }),
});

// formschema type
type formSchemaType = z.infer<typeof formSchema>;

const CreateNftForm = () => {
  const [image, setImage] = useState<string>(
    "https://png.pngtree.com/element_our/20190601/ourmid/pngtree-file-upload-icon-image_1344393.jpg"
  );
  const router = useRouter();
  const formInputs = async (data: formSchemaType) => {
    const JWT =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwOTNmZjViOC1mNDU2LTQ2MDMtODYyOS0wODEyZjAxOTQ5Y2QiLCJlbWFpbCI6InNvZGVlcWFkZW1vbGExOTk0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4ZmM4MjEzNTk5ZWM5MGVlNDU4NCIsInNjb3BlZEtleVNlY3JldCI6IjEwZWEzZTljZDg1YWE4YTI4Y2UwMTQ0ZTI5ZGVkMzhlMThiOGUxYTY3NTZmN2E5MjU0ZmY0MzQxYzIwMzY5Y2MiLCJleHAiOjE3NjMzNzMwMDV9.Nsm0V_3Q7dVFO9xLmMseZzxb4tDAqroiC1MwsolyA_U";
    // console.log(data.image.type);

    try {
      //image upload to pinata
      const formData = new FormData();
      formData.append("file", data.image);

      const imageReq = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
          body: formData,
        }
      );

      const imageRes = await imageReq.json();

      const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageRes.IpfsHash}`;
      // console.log(imageUrl);

      // file upload to pinata

      const { description, price, title } = data;

      const fileReq = await fetch(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JWT}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description, image: imageUrl, price, title }),
        }
      );

      const fileRes = await fileReq.json();

      const fileUrl = `https://gateway.pinata.cloud/ipfs/${fileRes.IpfsHash}`;
      // console.log(fileUrl);

      const etherPrice = ethers.parseUnits(data.price, "ether");

      await CreateItem(fileUrl, etherPrice);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(formInputs)}
      className="w-[50%] my-4  flex justify-between flex-col gap-4 z-0"
    >
      <Input
        type="text"
        label={"Title"}
        {...register("title")}
        errorMessage={errors.title?.message}
        isInvalid={!!errors.title}
      />
      <Input
        type="text"
        label="Description"
        {...register("description")}
        errorMessage={errors.description?.message}
        isInvalid={!!errors.description}
      />
      <Input
        label="price"
        {...register("price")}
        errorMessage={errors.price?.message}
        isInvalid={!!errors.price}
      />
      <Controller
        // {...register("image")}
        name="image"
        control={control}
        render={({ field: { onChange, onBlur } }) => (
          <Input
            type="file"
            onBlur={onBlur}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChange(e.target.files?.[0]);
              setImage(
                URL.createObjectURL(e.target.files?.[0] as Blob | MediaSource)
              );
            }}
            errorMessage={errors.image?.message}
            isInvalid={!!errors.image}
          />
        )}
      />
      {Image && (
        <Image
          src={image}
          alt="image"
          width={120}
          height={120}
          quality={90}
          className="rounded-lg mx-auto"
        />
      )}

      <Button type="submit">Create Digital Assets</Button>
    </form>
  );
};

export default CreateNftForm;
