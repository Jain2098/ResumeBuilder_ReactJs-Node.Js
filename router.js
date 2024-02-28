const express = require("express");
const fs = require("fs").promises;
const path = require("path");

// v4 of uuid | generates UNIQUE ID
const { v4: uuidv4 } = require("uuid");

// for Image Processing
const multer = require("multer");

const router = express.Router();
router.use(express.json());

const fileTypes = ["jpg", "png", "jpeg", "webp"];

function generateId(req, res, next) {
  // Attach the generated ID to the request object
  req.uniqueId = uuidv4();
  next();
}

const storage = multer.diskStorage({
  destination: "./form_images/",
  filename: (req, file, cb) => {
    const extension = file.originalname.split(".").pop() || jpg;
    cb(null, `${req.uniqueId}.${extension}`); // Use the ID from the request
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post( "/create_new", generateId, upload.single("image"), async (req, res) => {
    const data = req.body;
    const id = req.uniqueId;
    data.uniqueid = id;
    // get current date and time and add it to the data
    data.date = new Date().toLocaleString();
    console.log(data.date);
    if (data.personalInfo.firstname === "" || data.objective === ""){
      // console.error("status: 400 \t message: First Name and Objective are required");
      return res.status(400).send({ status: "400", message: "Incomplete Fields" });
    }
    if (req.file) {
      try {
        // to check image is of valid type
        imageType = (await import("image-type")).default;
        const fileBuffer = await fs.readFile(req.file.path);
        const fileType = imageType(fileBuffer);
        if (
          !fileType ||
          !["jpg", "png", "jpeg", "webp"].includes(fileType.ext)
        ) {
          await fs.unlink(req.file.path); // unlink = deletes the file
          return res
            .status(400)
            .send({ message: "Invalid image file format." });
        }
        data.imageID = id;
      } catch (error) {
        return res
          .status(500)
          .send({ message: "Failed to process the image file." });
      }
    }

    const filePath = `./form_data/${id}.json`;
    // writeFile write in async
    // 2 means that it will format with 2 spaces per indentation level [making more readable]
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      console.log("status: 200 \t message: New Entry Added");
      res.send({ status: "200", id: id, message: "success", uniqueid: id });
    } 
    catch (err) {
      console.error(
        `status: 500 \t message: Error writing to file \t reason: ${err}`
      );
      return res.status(500).send("An Error Occurred");
    }
  }
);

function parseDateString(dateString) {
  // Adjust the format if necessary to ensure correct parsing
  const adjustedString = dateString.replace(' p.m.', ' PM').replace(' a.m.', ' AM');
  return new Date(adjustedString);
}

router.get("/get_all", async (req, res) => {
  const directoryPath = path.join(__dirname, "form_data");
  try {
    const files = await fs.readdir(directoryPath);
    // sort files by date
    const getData = files.map(async (file) => {
      if (file.endsWith(".json")) {
        const file_Path = path.join(directoryPath, file);
        const file_content = await fs.readFile(file_Path, "utf8");
        const jsonData = JSON.parse(file_content);
        const date = parseDateString(jsonData.date);
        return { ...jsonData, date };
      }
    });
    const data = (await Promise.all(getData)).filter(
      (item) => item !== undefined
    );
    data.sort((a, b) => b.date - a.date);
    // console.log(data);
    res.send(data);
    console.log("status: 200 \t message: Data Retrieved Successfully");
  } catch (err) {
    console.error(
      `status: 500 \t message: Error writing to file \t reason: ${err}`
    );
    return res.status(500).send("An Error Occurred");
  }
});

router.put("/update", async (req, res) => {
  console.log("---- Under update ----");
  const { uniqueid } = req.query;
  const data = req.body;
  // console.log(uniqueid, data);
  if (!uniqueid) {
    // If no 'id' is provided, return a 400 Bad Request error
    console.error("status: 400 \t message: ID query parameter is required");
    return res.status(400).send({ message: "ID query parameter is required" });
  }
  const filePath = path.join(__dirname, "form_data", `${uniqueid}.json`);
  try {
    // Attempt to read the specified file
    const fileContent = await fs.readFile(filePath, "utf8");
    const oldData = JSON.parse(fileContent);
    // const newData = { ...oldData, ...data };
    const newData = { ...data };
    newData.date = new Date().toLocaleString();
    newData.uniqueid = uniqueid;
    /*  -------------------------------------------------------------------------------------
        2 means that it will format with 2 spaces per indentation level [making more readable]
        ------------------------------------------------------------------------------------- */
    await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
    res.send({ status: "200", message: "File updated successfully" });
  } catch (error) {
    if (error.code === "ENOENT") {
      // The file does not exist
      console.error("status: 404 \t message: File not found");
      return res.status(404).send({ message: "File not found" });
    } else {
      // An error occurred while reading the file
      console.error(
        `status: 500 \t message: Error reading the file \t reason: ${error}`
      );
      return res
        .status(500)
        .send({ message: "An error occurred while reading the file" });
    }
  }

});

router.get("/single", async (req, res) => {
  console.log("---- Under single ----");
  const { uniqueid } = req.query;
  if (!uniqueid) {
    // If no id is provided, return a 400
    console.error("status: 400 \t message: ID query parameter is required");
    return res.status(400).send({ message: "ID query parameter is required" });
  }
  const filePath = path.join(__dirname, "form_data", `${uniqueid}.json`);
  try {
    // read the specified file
    const fileContent = await fs.readFile(filePath, "utf8");

    // Successfully read the file, parse it, and send the content as a response
    res.send(JSON.parse(fileContent));
  } catch (error) {
    if (error.code === "ENOENT") {
      // The file does not exist
      console.error("status: 404 \t message: File not found");
      return res.status(404).send({ message: "File not found" });
    } else {
      // An error occurred while reading the file
      console.error(
        `status: 500 \t message: Error reading the file \t reason: ${error}`
      );
      
      return res
        .status(500)
        .send({ message: "An error occurred while reading the file" });
    }
  }
});

router.delete("/delete", async (req, res) => {
  const { uniqueid } = req.query;

  if (!uniqueid) {
    // If no 'id' is provided, return a 400 Bad Request error
    console.error("status: 400 \t message: ID query parameter is required");
    return res.status(400).send({ message: "ID query parameter is required" });
  }
  const filePath = path.join(__dirname, "form_data", `${uniqueid}.json`);
  try {
    // Attempt to read the specified file
    await fs.unlink(filePath);
    res.send({ status: "200", message: "File deleted successfully" });
  } catch (error) {
    if (error.code === "ENOENT") {
      // The file does not exist
      console.error("status: 404 \t message: File not found");
      return res.status(404).send({ message: "File not found" });
    } else {
      // An error occurred while reading the file
      console.error(
        `status: 500 \t message: Error reading the file \t reason: ${error}`
      );
      return res
        .status(500)
        .send({ message: "An error occurred while reading the file" });
    }
  }
})



router.get("/", (req, res) => {
  res.send("Nodemon is Running...");
});

module.exports = router;
