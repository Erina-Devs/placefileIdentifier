const fs = require("fs");
const readline = require("readline-sync");

function makeID() {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	for (let i = 0; i < 5; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
}

/* Cuestionario */

let filePath = readline.question(
	"Introduce la direccion de la carpeta de imagenes:\n"
);
let filesCount = 0;
let renameCount = 0;
let readPath;
try {
	readPath = fs.readdirSync(filePath);
} catch (e) {
	console.log(
		`[${filePath}] No es una dirección válida. Inténtelo de nuevo.`
	);
	process.exit();
}
console.log(`[${filePath}] Dirección establecida.`);
readPath.forEach((file) => {
	filesCount++;
});
console.log("Se encontraron " + filesCount + " archivos.");
if (filesCount <= 0) {
	console.log("Debes añadir al menos un archivo en este directorio.");
	process.exit();
}
let openPath = fs.opendirSync(filePath);

readPath.forEach((file) => {
	let fileExt = file.split(".");
	fs.rename(
		openPath.path + "/" + file,
		openPath.path + "/" + makeID() + "." + fileExt[1],
		(err) => {
			if (err) console.log("ERROR: " + err);
		}
	);
	renameCount++;
	console.log("Se han renombrado " + renameCount + " archivos.");
});
console.log("Operación terminada con éxito.");
