const getQuests = (req, res) => {
    res.status(200).json({ message: 'quest' });
}

const createQuest = (req, res) => {
    res.status(200).json({ message: 'created' });
}

const updateQuest = (req, res) => {
    res.status(200).json({ message: `updated ${req.params.id}` });
}

const deleteQuest = (req, res) => {
    res.status(200).json({ message: `deleted ${req.params.id}` });
}

module.exports = {
    getQuests,
    createQuest,
    updateQuest,
    deleteQuest
};