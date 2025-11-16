import { Request, Response } from 'express';
import NewsArticle from '../models/NewsArticle';

export const getNewsArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, limit = 100, skip = 0, sortBy = 'date-desc' } = req.query;

    const filter: any = {};
    if (category && category !== 'all') {
      filter.category = category;
    }

    // Default sort: by date descending (latest first)
    // This naturally shows latest reports first since news is created when reports are created
    let sort: any = { date: -1 };
    
    if (sortBy === 'date-asc') {
      sort = { date: 1 };
    } else if (sortBy === 'date-desc') {
      sort = { date: -1 };
    } else if (sortBy === 'title-asc') {
      sort = { title: 1 };
    } else if (sortBy === 'title-desc') {
      sort = { title: -1 };
    } else if (sortBy === 'latest-reports') {
      // Prioritize latest reports: sort by date descending
      sort = { date: -1 };
    }

    const articles = await NewsArticle.find(filter)
      .populate('hazardReportId', 'type location severity verified createdAt')
      .sort(sort)
      .limit(Number(limit))
      .skip(Number(skip));

    const total = await NewsArticle.countDocuments(filter);

    res.status(200).json({
      message: 'News articles retrieved successfully',
      data: articles,
      total,
      limit: Number(limit),
      skip: Number(skip),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error retrieving news articles' });
  }
};

export const createNewsArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, summary, imageUrl, category, date } = req.body;

    const article = await NewsArticle.create({
      title,
      summary,
      imageUrl,
      category,
      date: date || new Date(),
    });

    res.status(201).json({
      message: 'News article created successfully',
      data: article,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error creating news article' });
  }
};

