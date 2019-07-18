import * as Yup from 'yup';
import { startOfHour, isBefore } from 'date-fns';
import Meetup from '../models/Meetup';

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
}

export default new MeetupController();
