# 🧠 Smart To-Do List System

A smart task management web application built using **HTML, CSS, and JavaScript**.
This app helps users manage tasks efficiently with features like reminders, progress tracking, and automatic task updates.

---

## 🚀 Features

* ✅ Add tasks with date and time
* ⏰ Smart reminders with alert confirmation
* 📊 Progress tracking with visual progress bar
* 🔄 Auto move tasks (To Do → In Progress → Done)
* ⚠️ Missed task detection
* 🗓 Calendar view for daily tasks
* 💾 Data saved using Local Storage
* 🎯 Priority levels (Low, Medium, High)
* 📱 Responsive design (works on mobile)

---

## 📂 Project Structure

```
project/
│
├── index.html      # Main HTML file
├── style.css       # Styling file
└── script.js       # JavaScript logic
```

---

## 🛠 Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Bootstrap 5
* Bootstrap Icons

---

## ⚙️ How It Works

1. User adds a task with time, date, and duration
2. System checks time every second
3. When task time arrives:

   * Shows alert (Start task?)
4. If accepted:

   * Task moves to **In Progress**
   * Timer starts
5. After time ends:

   * Task automatically moves to **Done**
6. If ignored:

   * Task marked as **Missed**

---

## 📸 Screens / Sections

* Dashboard (stats overview)
* Tasks (To Do / In Progress / Done)
* Calendar view

---

## 💡 Key Concepts Used

* DOM Manipulation
* setInterval() for real-time updates
* LocalStorage for saving data
* Dynamic UI rendering
* Time-based automation logic

---

## ▶️ How to Run

1. Download or clone the project
2. Open folder in VS Code
3. Run `index.html` in browser

---

## ⚠️ Important Notes

* Make sure all files are in correct folders
* Keep file names exact (`style.css`, `script.js`)
* Use correct path linking in HTML
## 💾 Data Storage

This project uses **browser localStorage** to store task data.

* All tasks are saved locally in the user's browser
* Data persists even after page refresh
* No external database or cloud storage is used

### ⚠️ Limitations

* Data is not stored online
* Data will be lost if browser storage is cleared
* Tasks are not accessible across multiple devices

---

## 👨‍💻 Author

Rushikesh Barve

---

## ⭐ Future Improvements

* 🔔 Browser notifications
* 📱 Mobile app version (PWA)


---

## 📌 Conclusion

This project demonstrates a **real-time smart task management system** using core web development skills and logic-based automation.

---
