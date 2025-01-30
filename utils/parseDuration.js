
// Utility function to parse a duration string into minutes
const parseDuration = (duration) => {
    const regex = /(\d+)\s*(hour|minute|second)s?/i;
    const match = duration.match(regex);
  
    if (match) {
      const value = parseInt(match[1]);
      const unit = match[2].toLowerCase();
  
      if (unit === 'hour') {
        return value * 60; // Convert hours to minutes
      }
      if (unit === 'minute') {
        return value; // Return minutes
      }
      if (unit === 'second') {
        return value / 60; // Convert seconds to minutes
      }
    }
  
    throw new Error('Invalid duration format');
  };
  
  module.exports = parseDuration;  