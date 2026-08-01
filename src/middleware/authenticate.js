import { Session } from '../models/session.js';
import { User } from '../models/user.js';
import createHttpError from 'http-errors';

export const authenticate = async (req, res, next) => {
  try {
    const { sessionId, accessToken } = req.cookies;

    if (!sessionId || !accessToken) {
      throw createHttpError(401, 'Missing session id or access token');
    }

    const session = await Session.findOne({ _id: sessionId, accessToken });
    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    if (new Date() > session.accessTokenValidUntil) {
      throw createHttpError(401, 'Access token expired');
    }

    const user = await User.findById(session.userId);
    if (!user) {
      throw createHttpError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};