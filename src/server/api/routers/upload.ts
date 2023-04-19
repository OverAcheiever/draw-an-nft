import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Upload } from "upload-js";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

export const upload = createTRPCRouter({
  upload: publicProcedure
    .input(z.object({ image: z.string() }))
    .mutation(async ({ input }) => {
      const res = await axios.post(
        "https://stablediffusionapi.com/api/v5/pix2pix",
        {
          key: "GkTrr60EN0X5XTZHAa9av56a750QJMp6SNBzBNSfrvPyITELZkWvvAz4LuTb",
          prompt: "art",
          init_image: input.image,
          image_guidance_scale: 1,
          steps: 50,
          guidance_scale: 7,
        }
      );

      return { image: res.data.output as string };
    }),
});
