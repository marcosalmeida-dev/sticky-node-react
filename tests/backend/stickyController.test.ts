global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

import { Request, Response } from "express";
import { Sticky } from "../../src/backend/models/sticky";
import {
  getStickies,
  getStickyById,
  createSticky,
  updateSticky,
  deleteSticky,
} from "../../src/backend/controllers/stickyController";

// Mock Mongoose methods
jest.mock("../../src/backend/models/sticky");

describe("Sticky Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    req = {};
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();
    res = {
      json: mockJson,
      status: mockStatus,
    };
  });

  describe("getStickies", () => {
    it("should return all stickies", async () => {
      const mockStickies = [
        { _id: "1", title: "Sticky 1", description: "Description 1" },
        { _id: "2", title: "Sticky 2", description: "Description 2" },
      ];
      (Sticky.find as jest.Mock).mockResolvedValue(mockStickies);

      await getStickies(req as Request, res as Response);

      expect(Sticky.find).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockStickies);
    });

    it("should handle errors", async () => {
      (Sticky.find as jest.Mock).mockRejectedValue(new Error("Error fetching"));

      await getStickies(req as Request, res as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Failed to fetch Stickies",
      });
    });
  });

  describe("getStickyById", () => {
    it("should return a sticky by ID", async () => {
      const mockSticky = {
        _id: "1",
        title: "Sticky 1",
        description: "Description 1",
      };
      (Sticky.findById as jest.Mock).mockResolvedValue(mockSticky);

      req = { params: { id: "1" } };

      await getStickyById(req as Request, res as Response);

      expect(Sticky.findById).toHaveBeenCalledWith("1");
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockSticky);
    });

    it("should return 404 if sticky is not found", async () => {
      (Sticky.findById as jest.Mock).mockResolvedValue(null);

      req = { params: { id: "1" } };

      await getStickyById(req as Request, res as Response);

      expect(Sticky.findById).toHaveBeenCalledWith("1");
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: "Sticky not found" });
    });

    it("should handle errors", async () => {
      (Sticky.findById as jest.Mock).mockRejectedValue(
        new Error("Error fetching")
      );

      req = { params: { id: "1" } };

      await getStickyById(req as Request, res as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Failed to fetch Sticky",
      });
    });
  });

  describe("createSticky", () => {
    it("should create a new sticky", async () => {
      const mockSticky = {
        _id: "1",
        title: "Sticky 1",
        description: "Description 1",
      };
      (Sticky.prototype.save as jest.Mock).mockResolvedValue(mockSticky);

      req = { body: { title: "Sticky 1", description: "Description 1" } };

      await createSticky(req as Request, res as Response);

      expect(mockStatus).toHaveBeenCalledWith(201);
    });

    it("should handle errors", async () => {
      (Sticky.prototype.save as jest.Mock).mockRejectedValue(
        new Error("Error saving")
      );

      req = { body: { title: "Sticky 1", description: "Description 1" } };

      await createSticky(req as Request, res as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Failed to create Sticky",
      });
    });
  });

  describe("updateSticky", () => {
    it("should update an existing sticky", async () => {
      const mockSticky = {
        _id: "1",
        title: "Updated Sticky",
        description: "Updated Description",
      };
      (Sticky.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockSticky);

      req = {
        params: { id: "1" },
        body: { title: "Updated Sticky", description: "Updated Description" },
      };

      await updateSticky(req as Request, res as Response);

      expect(Sticky.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        { title: "Updated Sticky", description: "Updated Description" },
        { new: true }
      );
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockSticky);
    });

    it("should return 404 if sticky is not found", async () => {
      (Sticky.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      req = {
        params: { id: "1" },
        body: { title: "Updated Sticky", description: "Updated Description" },
      };

      await updateSticky(req as Request, res as Response);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: "Sticky not found" });
    });

    it("should handle errors", async () => {
      (Sticky.findByIdAndUpdate as jest.Mock).mockRejectedValue(
        new Error("Error updating")
      );

      req = {
        params: { id: "1" },
        body: { title: "Updated Sticky", description: "Updated Description" },
      };

      await updateSticky(req as Request, res as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Failed to update Sticky",
      });
    });
  });

  describe("deleteSticky", () => {
    it("should delete an existing sticky", async () => {
      const mockSticky = {
        _id: "1",
        title: "Sticky 1",
        description: "Description 1",
      };
      (Sticky.findByIdAndDelete as jest.Mock).mockResolvedValue(mockSticky);

      req = { params: { id: "1" } };

      await deleteSticky(req as Request, res as Response);

      expect(Sticky.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        Sticky: "Sticky deleted successfully",
      });
    });

    it("should return 404 if sticky is not found", async () => {
      (Sticky.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      req = { params: { id: "1" } };

      await deleteSticky(req as Request, res as Response);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: "Sticky not found" });
    });

    it("should handle errors", async () => {
      (Sticky.findByIdAndDelete as jest.Mock).mockRejectedValue(
        new Error("Error deleting")
      );

      req = { params: { id: "1" } };

      await deleteSticky(req as Request, res as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Failed to delete Sticky",
      });
    });
  });
});
