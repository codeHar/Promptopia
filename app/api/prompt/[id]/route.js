import Prompts from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompts.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompts.findById(params.id);

    if (!existingPrompt) {
      return new Response("No prompt found with this id", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response("Error while updating prompt", { status: 400 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await Prompts.findByIdAndDelete(params.id);
    return new Response("Successfully deleted prompy with id: " + params.id, {
      status: 200,
    });
  } catch (err) {
    return new Response("Error while deleting prompt", { status: 400 });
  }
};
