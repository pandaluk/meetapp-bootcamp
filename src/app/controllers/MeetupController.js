import * as Yup from 'yup';
import { startOfHour, isBefore } from 'date-fns';
import Meetup from '../models/Meetup';
import File from '../models/File';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, description, location, date, file_id } = req.body;

    /**
     * Check for past dates
     */
    const hourStart = startOfHour(date);

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Date of event invalid' });
    }

    /**
     * Create the meetup
     */
    const meetup = await Meetup.create({
      user_id: req.userId,
      title,
      description,
      location,
      date,
      file_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
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
    const { userId } = req;

    if (meetup.user_id !== userId) {
      return res
        .status(401)
        .json({ error: "You're not the creator of the meetup." });
    }

    /**
     * Verify if the date still is valid
     */

    if (isBefore(meetup.date, new Date())) {
      return res.status(400).json({
        error: 'You can not change a meetup that has passed the date',
      });
    }

    const { date } = req.body;
    if (isBefore(date, new Date())) {
      return res
        .status(400)
        .json({ error: 'The new date of the Meetup already pass' });
    }

    /**
     * update meetup
     */
    const { id, title, description, location, file_id } = await meetup.update(
      req.body
    );

    return res.json({ id, title, description, location, file_id, userId });
  }

  async index(req, res) {
    const { userId } = req;

    const meetups = await Meetup.findAll({
      where: { user_id: userId },
      attributes: ['id', 'title', 'description', 'location', 'date'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    res.json(meetups);
  }
}

export default new MeetupController();
