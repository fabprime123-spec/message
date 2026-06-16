export async function checkAuth(req: any, res: any, next: any) {
  if (!req.user) return res.status(401).json({ message: "Unauthorized access" })
  res.status(200).json(req.user)
}