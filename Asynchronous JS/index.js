import fs from "fs";
import { resolve } from "path";
import superagent from "superagent";

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) reject("I could not find the file.");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file.");
      resolve("success!");
    });
  });
};

/************ USING ASYNC/AWAIT (PREFERABLE AS EASY TO READ) ***********/
const getDogPic = async () => {
  try {
    const data = await readFilePro("./dog.txt");
    console.log(`Breed: ${data}.`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro("dog-img.txt", res.body.message);
    console.log("Random dog file has been saved.");
  } catch (err) {
    console.log(err);
  }
};

getDogPic();

/******** Using .then() and .catch() methods
readFilePro("./dog.txt")
  .then((data) => {
    console.log(`Breed: ${data}.`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro("dog-img.txt", res.body.message);
  })
  .then(() => console.log("Random dog file has been saved."))
  // This catch() method will catch error from either of .then() methods.
  .catch((err) => {
    console.log(err);
  });

  **********/

// For removing callback hell we will chain multiple .then() methods to each other.

/********** CALLBACK HELL **********/
// fs.readFile("./dog.txt", "utf-8", (err, data) => {
//   console.log(`Breed: ${data}.`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);

//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log("Random dog image saved.");
//       });
//     });
// });
