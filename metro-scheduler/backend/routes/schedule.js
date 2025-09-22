const express = require("express");
const router = express.Router();

// Stations and time slots
const stations = ["Central", "North", "South"];
const timeSlots = ["08:00", "09:00", "10:00", "11:00"];

// Generate dynamic timetable
function generateTimetable() {
  let timetable = [];
  stations.forEach(station => {
    timeSlots.forEach(time => {
      const trains = Math.floor(Math.random() * 4) + 3; // 3-6 trains
      const passengers = trains * 200 + Math.floor(Math.random() * 100 - 50);
      timetable.push({ station, time, trains, passengers });
    });
  });
  return timetable;
}

// Dashboard
router.get("/", (req, res) => {
  const timetable = generateTimetable();
  res.render("index", { timetable });
});

// API for live updates
router.get("/api/timetable", (req, res) => {
  res.json(generateTimetable());
});

// AI Optimization for peak hours
router.post("/optimize", (req, res) => {
  const timetable = generateTimetable();
  const optimized = timetable.map(slot => {
    if (slot.time >= "08:00" && slot.time <= "10:00") slot.trains += 2;
    return slot;
  });
  res.render("result", { before: timetable, after: optimized });
});

module.exports = router;
