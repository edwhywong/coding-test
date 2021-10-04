import express from "express";
import { sharksList, catsList } from "../data/imagesList";
import { shuffleArray } from "../utils/index";

const router = express.Router();

/* GET photo list */
router.get("/photos", (req, res, next) => {
  const photoType = req.query.type;
  let photoList = [];

  switch (photoType) {
    case "cats":
      photoList = catsList;
      break;
    case "sharks":
      photoList = sharksList;
      break;
    case "both":
      let fullList = [...catsList, ...sharksList];
      shuffleArray(fullList);
      photoList = fullList;
      break;
    default:
      break;
  }

  res.json({ photoList });
});

export default router;
