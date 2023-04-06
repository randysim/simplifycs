import piston from "piston-client";

const client = piston();

export default async function handler(req, res) {
  let language = req.body.language;
  let code = req.body.code;

  let result = await client.execute({
    language: language,
    version: "*",
    files: [{
      name: "main",
      content: code
    }],
    compileTimeout: 10000,
    runTimeout: 3000,
    compileMemoryLimit: -1,
    runMemoryLimit: -1
  });

  res.status(200).json(result);
}
