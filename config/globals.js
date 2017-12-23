let date = new Date(),
  compiledAt = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
module.exports = {
  compiledAt
};
