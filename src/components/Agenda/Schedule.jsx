import { useState } from "react";

const Schedule = () => {
    const [selectedDate, setSelectedDate] = useState("2024-10-29");
    const [selectedTime, setSelectedTime] = useState("14:00");

    return (
        <div className="schedule-page">
            <h1>Agendar horário</h1>
            <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
            <div className="time-grid">
                {["11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30"].map(time => (
                    <button
                        key={time}
                        className={selectedTime === time ? "selected" : ""}
                        onClick={() => setSelectedTime(time)}
                    >
                        {time}
                    </button>
                ))}
            </div>
            <button className="confirm-btn">Confirmar horário</button>
        </div>
    );
};

export default Schedule;