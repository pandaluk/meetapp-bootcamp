import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';
import Meetup from '../models/Meetup';
import User from '../models/User';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      file_id: Yup.number().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Check for past dates
     */

    if (isBefore(req.body.date, new Date())) {
      return res.status(400).json({ error: 'Meetup date invalid' });
    }

    /**
     * Create the meetup
     */
    const user_id = req.userId;

    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      file_id: Yup.number(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user_id = req.userId;

    const meetup = await Meetup.findByPk(req.params.id);

    /**
     * Verify if the meetup exits
     */
    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    /**
     * Verify if the user is the owner of the meetup
     */

    if (meetup.user_id !== user_id) {
      return res
        .status(401)
        .json({ error: "You're not the creator of the meetup." });
    }

    /**
     * Verify if the date still is valid
     */

    if (meetup.past) {
      return res.status(400).json({
        error: 'You can not change a meetup that has passed the date',
      });
    }

    if (isBefore(req.body.date, new Date())) {
      return res
        .status(400)
        .json({ error: 'The new date of the Meetup already pass' });
    }

    /**
     * update meetup
     */
    await meetup.update(req.body);

    return res.json(meetup);
  }

  async index(req, res) {
    const where = {};
    const page = req.query.page || 1;

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const meetups = await Meetup.findAll({
      where,
      include: [User],
      limit: 10,
      offset: 10 * page - 10,
    });

    return res.json(meetups);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    /**
     * Verify if the meetup exits
     */
    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    /**
     * Verify if the user is the owner of the meetup
     */
    const user_id = req.userId;

    if (meetup.user_id !== user_id) {
      return res
        .status(401)
        .json({ error: "You're not the creator of the meetup." });
    }

    /**
     *Verify if the meetup date already pass
     */

    if (meetup.past) {
      return res
        .status(400)
        .json({ error: 'The new date of the Meetup already pass' });
    }

    await meetup.destroy();

    return res.json({ ok: 'ok' });
  }
}

export default new MeetupController();
