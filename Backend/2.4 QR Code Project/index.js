/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      type: "input",
      message: "Enter the URL to convert to a QR code",
      name: "url",
    },
  ])
  .then((answers) => {
    const url = answers.url;
    const qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream("qr_img.png"));
    console.log("QR code has been saved to qr_img.png");
    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("URL has been saved to URL.txt");
    });
  })
  .catch((error) => {
    console.log(error);
  });
