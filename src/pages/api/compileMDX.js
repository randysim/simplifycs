import compileMDX from '@/lib/compileMDX.js';

export default async function handler(req, res) {
  try {
    res.status(200).json(await compileMDX(req.body.source));
  } catch (e) {
    res.status(200).json({error: "a"});
  }
}
