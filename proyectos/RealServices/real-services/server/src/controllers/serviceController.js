const Service = require('../models/Service');

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate('provider', 'name email avatar');
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const service = await Service.create({
      ...req.body,
      provider: req.user.id
    });
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('provider', 'name email avatar phone');
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
