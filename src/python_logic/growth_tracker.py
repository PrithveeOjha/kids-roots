import tkinter as tk
from tkinter import messagebox
import json
import os


class GrowthApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Kids Roots - Growth Tracker")
        self.root.geometry("450x600")
        self.root.configure(bg="#FFF5F7")

        # UI Elements
        tk.Label(root, text="🌈 Kids Roots Growth", font=("Comic Sans MS", 20, "bold"), bg="#FFF5F7", fg="#FF8E9E").pack(
            pady=20)

        self.create_input("Age (Years):", "age")
        self.create_input("Height (cm):", "height")
        self.create_input("Weight (kg):", "weight")

        tk.Button(root, text="ANALYZE MAGIC GROWTH ✨", command=self.calculate, bg="#BDE0FE",
                  font=("Comic Sans MS", 10, "bold"), bd=0).pack(pady=20, ipady=10, ipadx=20)

        self.res_label = tk.Label(root, text="Result will appear here", bg="white", font=("Verdana", 10),
                                  wraplength=350, pady=20)
        self.res_label.pack(fill="x", padx=40)

    def create_input(self, txt, attr):
        tk.Label(self.root, text=txt, bg="#FFF5F7").pack()
        entry = tk.Entry(self.root, justify="center", font=("Arial", 12))
        entry.pack(pady=5, ipady=5)
        setattr(self, f"{attr}_entry", entry)

    def calculate(self):
        try:
            h = float(self.height_entry.get())
            w = float(self.weight_entry.get())
            bmi = round(w / ((h / 100) ** 2), 2)

            status = "Normal"
            advice = "Child is healthy! Maintain the child's diet."
            if bmi < 18.5:
                status = "Underweight"
                advice = "Height is less than standard. Increase calcium and protein."
            elif bmi > 25:
                status = "Overweight"
                advice = "Increase physical activity and decrease sugar intake."

            self.res_label.config(text=f"BMI: {bmi}\nStatus: {status}\nAdvice: {advice}")
        except ValueError:
            messagebox.showerror("Error", "Enter valid numbers!")


if __name__ == "__main__":
    root = tk.Tk()
    app = GrowthApp(root)
    root.mainloop()
