import { Request, Response, NextFunction } from 'express';

export function validateFileType(allowedTypes: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        error: 'Invalid file type',
        allowedTypes,
      });
    }

    next();
  };
}
