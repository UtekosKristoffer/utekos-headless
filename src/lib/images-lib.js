import imageManifest from "@/Lib/image-manifest.json";

// Hent ut de kategoriene du trenger
const blueImgs = imageManifest.Blue;
const blackImgs = imageManifest["Dark/Black"]; // Bruk hakeparentes pga. spesialtegnet /
const specialEdtImgs = imageManifest["Special Edition"];

// Nå kan du bruke dem:
console.log(blueImgs.main);
console.log(blackImgs.Mobile);
onsole.log(specialEdtImgs.Mobile);
