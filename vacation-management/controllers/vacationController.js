const Vacation = require('../models/Vacation');
const User = require('../models/User');

exports.requestVacation = async (req, res) => {
  const { StartDate, EndDate, DaysRequested } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const dailyRate = user.Salary / 25; // Basado en 25 días laborales al mes
    const totalPay = dailyRate * DaysRequested;

    const vacation = await Vacation.create({
      UserID: userId,
      StartDate,
      EndDate,
      DaysRequested,
      Salary: user.Salary,
      TotalVacationPay: totalPay,
    });

    res.status(201).json({ message: 'Vacation request submitted', vacation });
  } catch (error) {
    res.status(500).json({ error: 'Error requesting vacation' });
  }
};

// Controlador para ver el historial de vacaciones
exports.getVacationHistory = async (req, res) => {
  try {
    const vacations = await Vacation.findAll({ where: { UserID: req.user.id } });
    res.status(200).json(vacations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vacation history' });
  }
};

// Aprobar o rechazar vacaciones (Admin)
exports.approveVacation = async (req, res) => {
  try {
    const vacation = await Vacation.findByPk(req.params.id);
    if (!vacation) return res.status(404).json({ error: 'Vacation not found' });

    vacation.Status = 'Approved';
    await vacation.save();
    res.status(200).json({ message: 'Vacation approved', vacation });
  } catch (error) {
    res.status(500).json({ error: 'Error approving vacation' });
  }
};

exports.rejectVacation = async (req, res) => {
  try {
    const vacation = await Vacation.findByPk(req.params.id);
    if (!vacation) return res.status(404).json({ error: 'Vacation not found' });

    vacation.Status = 'Rejected';
    await vacation.save();
    res.status(200).json({ message: 'Vacation rejected', vacation });
  } catch (error) {
    res.status(500).json({ error: 'Error rejecting vacation' });
  }
};
