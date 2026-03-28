import tkinter as tk
from tkinter import messagebox, ttk
from datetime import datetime, timedelta


class VaccineApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Kids Roots - Vaccine Care")
        self.root.geometry("450x700")
        self.root.configure(bg="#FFFFFF")  # Clean White Background

        # FirstCry Inspired Color Palette
        self.fc_pink = "#FF679B"  # Signature Pink
        self.fc_blue = "#00ADEF"  # Sky Blue
        self.light_grey = "#F8F8F8"  # Soft background for cards
        self.text_dark = "#333333"  # Professional Dark Grey

        # Professional Vaccine Data
        self.full_schedule = [
            {"age": 0, "name": "BCG", "desc": "Tuberculosis"},
            {"age": 0, "name": "Hep B1", "desc": "Hepatitis B"},
            {"age": 1.5, "name": "DTaP 1", "desc": "Diphtheria/Tetanus"},
            {"age": 1.5, "name": "IPV 1", "desc": "Polio"},
            {"age": 6, "name": "Flu Vaccine", "desc": "Influenza"},
            {"age": 9, "name": "MMR 1", "desc": "Measles/Mumps"}
        ]

        # --- HEADER ---
        header_frame = tk.Frame(root, bg=self.fc_pink, height=80)
        header_frame.pack(fill="x")
        tk.Label(header_frame, text="Kids Roots Care", font=("Verdana", 18, "bold"),
                 bg=self.fc_pink, fg="white").pack(pady=20)

        # --- INPUT SECTION (Card Style) ---
        input_card = tk.Frame(root, bg="white", padx=20, pady=20)
        input_card.pack(fill="x", padx=20, pady=20)

        tk.Label(input_card, text="Baby's Birthday", font=("Verdana", 10, "bold"),
                 bg="white", fg=self.text_dark).pack(anchor="w")

        self.dob_entry = tk.Entry(input_card, font=("Arial", 12), bd=0,
                                  highlightthickness=1, highlightbackground="#DDDDDD")
        self.dob_entry.pack(fill="x", pady=(5, 15), ipady=8)
        self.dob_entry.insert(0, "2025-01-01")

        # Action Button (Rounded feel)
        self.btn_check = tk.Button(input_card, text="VIEW VACCINATION PLAN", command=self.update_list,
                                   bg=self.fc_blue, fg="white", font=("Verdana", 9, "bold"),
                                   bd=0, cursor="hand2", activebackground="#0094CC")
        self.btn_check.pack(fill="x", ipady=10)

        # --- TABS (Styled as FirstCry Categories) ---
        style = ttk.Style()
        style.theme_use('default')
        style.configure("TNotebook", background="white", borderwidth=0)
        style.configure("TNotebook.Tab", font=("Verdana", 9), padding=[20, 10], background="#EEEEEE")
        style.map("TNotebook.Tab", background=[("selected", self.fc_pink)], foreground=[("selected", "white")])

        self.tab_control = ttk.Notebook(root)
        self.pending_tab = tk.Frame(self.tab_control, bg="white")
        self.completed_tab = tk.Frame(self.tab_control, bg="white")

        self.tab_control.add(self.pending_tab, text='UPCOMING')
        self.tab_control.add(self.completed_tab, text='HISTORY')
        self.tab_control.pack(expand=1, fill="both", padx=20, pady=(0, 20))

        # --- LIST BOXES ---
        self.pending_list = tk.Listbox(self.pending_tab, font=("Verdana", 10), bd=0,
                                       selectbackground=self.light_grey, fg=self.text_dark)
        self.pending_list.pack(expand=1, fill="both", padx=10, pady=10)

        self.completed_list = tk.Listbox(self.completed_tab, font=("Verdana", 10), bd=0,
                                         fg="#AAAAAA", selectbackground=self.light_grey)
        self.completed_list.pack(expand=1, fill="both", padx=10, pady=10)

        # Footer Label
        tk.Label(root, text="Verified by Kids Roots Health Panel", font=("Verdana", 7),
                 bg="white", fg="#BBBBBB").pack(pady=5)

    def update_list(self):
        try:
            dob_str = self.dob_entry.get()
            dob = datetime.strptime(dob_str, "%Y-%m-%d")
            today = datetime.now()

            self.pending_list.delete(0, tk.END)
            self.completed_list.delete(0, tk.END)

            for v in self.full_schedule:
                due_date = dob + timedelta(days=int(v['age'] * 30.44))
                display_text = f" {v['name']} | {v['desc']} \n Due: {due_date.strftime('%d %b %Y')}"

                if due_date < today:
                    self.completed_list.insert(tk.END, f"✓ {v['name']} - COMPLETED")
                    self.completed_list.insert(tk.END, "-" * 40)
                else:
                    self.pending_list.insert(tk.END, f"● {v['name']} - {due_date.strftime('%d %b')}")
                    self.pending_list.insert(tk.END, f"  ({v['desc']})")
                    self.pending_list.insert(tk.END, "-" * 40)

        except ValueError:
            messagebox.showerror("Invalid Date", "Please enter date in YYYY-MM-DD format.")


if __name__ == "__main__":
    root = tk.Tk()
    app = VaccineApp(root)
    root.mainloop()
