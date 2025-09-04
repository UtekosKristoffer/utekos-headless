//@ts-nocheck
import 'images-manifest' from "./image-manifest.json";

// Hent ut de kategoriene du trenger
const blueImgs = images-manifest.Blue;
const blackImgs = images-manifest["Dark/Black"]; // Bruk hakeparentes pga. spesialtegnet /
const specialEdtImgs = images-manifest["Special Edition"];

// Nå kan du bruke dem:
console.log(blueImgs.main);
console.log(blackImgs.Mobile);
console.log(specialEdtImgs.Mobile);