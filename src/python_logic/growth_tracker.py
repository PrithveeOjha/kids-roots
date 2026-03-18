import tkinter as tk
from tkinter import messagebox


class GrowthTracker:
    def __init__(self):
        # WHO Standards (Simplified)
        self.height_standards = {
            1: (70, 78), 2: (82, 92), 5: (100, 115)
        }

    def analyze_growth(self, age_years, height_cm, weight_kg):
        height_range = self.height_standards.get(age_years)
        bmi = round(weight_kg / ((height_cm / 100) ** 2), 2)

        # Default: Healthy State
        status = "Healthy & Strong! ✨"
        advice = "You are doing great! Keep eating your veggies! 🥦🥕"
        color = "#FF8E9E"  # Soft Rose Pink

        if height_range:
            if height_cm < height_range[0]:
                status = "Need More Magic Growth! 🌱"
                advice = "Time for extra milk and yummy proteins to grow taller! 🥛🥚"
                color = "#FFB347"  # Pastel Orange
            elif bmi > 25:
                status = "Energy Overload! 🏃‍♂️"
                advice = "Let's play more outside and swap sweets for juicy fruits! 🍎⚽"
                color = "#FF6B6B"  # Soft Red

        return {"bmi": bmi, "status": status, "advice": advice, "color": color}


class GrowthApp:
    def __init__(self, root):
        self.tracker = GrowthTracker()
        self.root = root
        self.root.title("Kids Roots - Magical Growth Tracker")
        self.root.geometry("450x650")
        self.root.configure(bg="#FFF5F7")  # Very Light Pastel Pink/Cream

        # --- COLORS ---
        self.bg_color = "#FFF5F7"
        self.primary_pink = "#FF8E9E"
        self.sky_blue = "#BDE0FE"
        self.text_grey = "#5D5D5D"

        # Header with Emoji
        tk.Label(root, text="🌈 Kids Roots", font=("Comic Sans MS", 24, "bold"),
                 bg=self.bg_color, fg=self.primary_pink).pack(pady=(30, 5))
        tk.Label(root, text="How much have you grown today?", font=("Verdana", 10, "italic"),
                 bg=self.bg_color, fg=self.text_grey).pack(pady=(0, 20))

        # Input Container
        self.container = tk.Frame(root, bg=self.bg_color)
        self.container.pack(pady=10, padx=40, fill="x")

        self.create_kids_input("How old are you? (Years)", "age")
        self.create_kids_input("How tall are you? (cm)", "height")
        self.create_kids_input("What is your weight? (kg)", "weight")

        # Magical Button
        self.btn = tk.Button(root, text="SEE MY MAGIC REPORT ✨", command=self.calculate,
                             bg=self.sky_blue, fg="#0077B6", font=("Comic Sans MS", 12, "bold"),
                             activebackground=self.primary_pink, activeforeground="white",
                             bd=0, cursor="hand2", padx=20, pady=10)
        self.btn.pack(pady=25)

        # Result Card (Rounded Look Feel)
        self.result_card = tk.Frame(root, bg="white", padx=20, pady=20,
                                    highlightthickness=2, highlightbackground=self.sky_blue)
        self.result_card.pack(fill="x", padx=40)

        self.status_label = tk.Label(self.result_card, text="Ready for Magic? 🪄",
                                     font=("Comic Sans MS", 14, "bold"), bg="white", fg=self.text_grey)
        self.status_label.pack()

        self.bmi_label = tk.Label(self.result_card, text="BMI: --",
                                  font=("Verdana", 10), bg="white", fg="#A0A0A0")
        self.bmi_label.pack(pady=5)

        self.advice_label = tk.Label(self.result_card, text="Fill your details and click the button!",
                                     font=("Verdana", 9), bg="white", fg=self.text_grey,
                                     wraplength=300, justify="center")
        self.advice_label.pack(pady=10)

    def create_kids_input(self, label_text, attr):
        lbl = tk.Label(self.container, text=label_text, font=("Verdana", 9, "bold"),
                       bg=self.bg_color, fg=self.text_grey)
        lbl.pack(anchor="w", pady=(10, 2))

        # Entry with a softer look
        entry = tk.Entry(self.container, font=("Verdana", 12), bg="white",
                         fg=self.text_grey, border=0, highlightthickness=1,
                         highlightbackground="#E0E0E0", justify="center")
        entry.pack(fill="x", ipady=8)
        setattr(self, f"{attr}_entry", entry)

    def calculate(self):
        try:
            age = int(self.age_entry.get())
            h = float(self.height_entry.get())
            w = float(self.weight_entry.get())

            res = self.tracker.analyze_growth(age, h, w)

            # Smooth UI Update
            self.status_label.config(text=res['status'], fg=res['color'])
            self.bmi_label.config(text=f"Your Magic BMI: {res['bmi']}")
            self.advice_label.config(text=res['advice'])

            # Button color feedback
            self.btn.config(bg=self.primary_pink, fg="white")

        except ValueError:
            messagebox.showwarning("Oopsie! 🍭", "Please enter numbers only so the magic works!")


if __name__ == "__main__":
    root = tk.Tk()
    app = GrowthApp(root)
    # Background subtle star pattern could be added here if needed
    root.mainloop()








