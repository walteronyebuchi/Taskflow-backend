const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password', // Replace with your email password or app-specific password
  },
});

app.post('/tasks/:id/share', authenticate, async (req, res) => {
  try {
    const taskId = req.params.id;
    const { email } = req.body;
    const taskDoc = await db.collection('tasks').doc(taskId).get();
    if (!taskDoc.exists) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = taskDoc.data();
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'TaskFlow: A Task Has Been Shared With You',
      text: `You have been assigned a task: ${task.title}\n\nDescription: ${task.description}\nDue Date: ${task.dueDate}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
      } else {
        console.log('Email sent:', info.response);
        res.json({ message: 'Task shared successfully' });
      }
    });
  } catch (error) {
    console.error('Error sharing task:', error);
    res.status(500).json({ error: 'Failed to share task' });
  }
});