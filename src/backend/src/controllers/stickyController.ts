import { Request, Response } from "express";
import { Sticky, ISticky } from "../models/sticky";

export const getStickies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const stickies: ISticky[] = await Sticky.find();
    res.status(200).json(stickies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Stickies" });
  }
};

export const getStickyById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sticky: ISticky | null = await Sticky.findById(req.params.id);
    if (!sticky) {
      res.status(404).json({ error: "Sticky not found" });
      return;
    }
    res.status(200).json(sticky);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Sticky" });
  }
};

export const createSticky = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description } = req.body;
    const newSticky: ISticky = new Sticky({ title, description });
    await newSticky.save();
    res.status(201).json(newSticky);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Sticky" });
  }
};

export const updateSticky = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description } = req.body;
    const updatedSticky: ISticky | null = await Sticky.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (!updatedSticky) {
      res.status(404).json({ error: "Sticky not found" });
      return;
    }
    res.status(200).json(updatedSticky);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Sticky" });
  }
};

export const deleteSticky = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedSticky: ISticky | null = await Sticky.findByIdAndDelete(
      req.params.id
    );
    if (!deletedSticky) {
      res.status(404).json({ error: "Sticky not found" });
      return;
    }
    res.status(200).json({ Sticky: "Sticky deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Sticky" });
  }
};
