const selectedTime = new Date(); // Current time
const interval = 60; // Time interval in minutes (1 hour)
export default function createTime(selectedTime = new Date(), interval = 60) {
  const NOW = new Date();
  const timeSlots = [];
  const startOfDay = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate(), 0, 0);
  const minutesInDay = 60 * 24;

  for (let i = 0; i < minutesInDay; i += interval) {
    const currentTime = new Date(startOfDay.getTime() + i * 60000); // 60000 milliseconds in a minute

    timeSlots.push({
      time: currentTime.toLocaleTimeString(),
      selected: selectedTime ? currentTime.getTime() === selectedTime.getTime() : false,
      now: currentTime.getTime() === NOW.getTime(),
    });
  }

  return timeSlots;
}
