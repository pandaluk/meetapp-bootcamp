import * as Yup from 'yup';
import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      event_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, title, description, location, event_date } = req.body;

    const meetup = await Meetup.create({
      user_id: req.userId,
      title,
      description,
      location,
      event_date,
    });

    return res.json(meetup);
  }
}

export default new MeetupController();
