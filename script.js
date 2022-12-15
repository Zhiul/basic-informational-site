const http = require("http");
const fs = require("fs");
const server = http.createServer();

server.on("request", async (req, res) => {
  async function render(path, statusCode = 200) {
    try {
      if (path === "./404") statusCode = 404;
      const data = await fs.promises.readFile(`${path}.html`, {
        encoding: "utf8",
      });
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    } catch (error) {
      throw new Error(error);
    }
  }

  try {
    const websiteURL = new URL(`http://${req.headers.host}${req.url}`);
    let path = `.${websiteURL.pathname}`;
    if (path === "./") path = "./index";
    await render(path);
  } catch {
    render("404");
  }
});

server.listen(8080);
