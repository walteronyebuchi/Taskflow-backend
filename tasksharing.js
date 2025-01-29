app.post('/tasks/:id/share', authenticate, async (req, res) => {
  try {
    const taskId = req.params.id;
    const { email } = req.body;
    const taskDoc = await db.collection('tasks').doc(taskId).get();
    if (!taskDoc.exists) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Send email logic (use a service like SendGrid or Nodemailer)
    console.log(`Task shared with ${email}`);
    res.json({ message: 'Task shared successfully' });
  } catch (error) {
    console.error('Error sharing task:', error);
    res.status(500).json({ error: 'Failed to share task' });
  }
});