const express = require("express");
const Images = require("../Model/Images");
const router = express.Router();
const upload = require("../middleware/upload");


router.post("/createImage", async (req, res, next) => {
    const image = new Images({
        title: req.body.title,
        thumbnail: req.body.thumbnail,
        largeImg: req.body.largeImg,
        description: req.body.description,
        cost: req.body.cost
    });
    try {

        let savedImage = await image.save();
        res.status(200).send(savedImage);

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

router.get("/album/:page", async (req, res, next) => {
    let page = req.params.page;
    let options = {
        lean: true,
        limit: 4,
        offset: page * 4
    };
    try {

        let images = await Images.paginate({}, options);
        res.status(200).send(images);

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

router.post("/uploadImage", upload.array('image', 2), async (req, res) => {
    res.status(200).json({ image: 'https://stopnc.s3.ap-south-1.amazonaws.com/profilepicture/' + req.file });
});

module.exports = router;
