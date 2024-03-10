import * as url from "url";
import path from "node:path";

const dirname = (importUrl: string) => {
  const __dirname = url.fileURLToPath(new URL(".", importUrl));

  return __dirname.endsWith(".js") ? path.dirname(__dirname) : __dirname;
};

export default dirname;
