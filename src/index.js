import "./styles.css";

function pad(value) {
  return String(value).padStart(2, "0");
}

const CountdownTimer = function ({ selector, targetDate }) {
  const date = targetDate.getTime();
  const refs = {
    days: document.querySelector(`${selector} [data-value=days]`),
    hours: document.querySelector(`${selector} [data-value=hours]`),
    minutes: document.querySelector(`${selector} [data-value=mins]`),
    seconds: document.querySelector(`${selector} [data-value=secs]`),
    updateTime(time) {
      const millisInSec = 1000;
      const millisInMinute = millisInSec * 60;
      const millisInHour = millisInMinute * 60;
      const millisInDay = millisInHour * 24;

      const days = pad(Math.floor(time / millisInDay));
      const hours = pad(Math.floor((time % millisInDay) / millisInHour));
      const mins = pad(Math.floor((time % millisInHour) / millisInMinute));
      const secs = pad(Math.floor((time % millisInMinute) / millisInSec));

      this.days.textContent = days;
      this.hours.textContent = hours;
      this.minutes.textContent = mins;
      this.seconds.textContent = secs;
    },
  };

  const handleTimer = () => {
    const currentDate = Date.now();
    const time = date - currentDate;
    if (time < 0) {
      clearInterval(intervalId);
      console.log("interval closed");
      return;
    }
    refs.updateTime(time);
  };

  handleTimer();

  const intervalId = setInterval(handleTimer, 1000);
};

new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date(2020, 11, 31, 23, 59, 59, 0),
});
