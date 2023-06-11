class Category:

    def __init__(self, name="", ledger=None):
        self.amount_deposited = 0
        self.amount_withdrawn = 0
        self.spent = 0
        self.name = name
        self.amount = ""
        self.description = ""

        if ledger is None:
            ledger = list()
        self.ledger = ledger

    def __str__(self):
        total = 0
        print((f'{self.name}'.center(30, "*")))
        strings = list()
        for index_ledger in range(0, len(self.ledger)):
            for key, value in self.ledger[index_ledger].items():
                if isinstance(value, float) or isinstance(value, int):
                    value = "{:.2f}".format(value)
                if len(value) > 23:
                    value = value[:23]
                strings.append(value)
            space_length = (30 - len(strings[0]) - len(strings[1])) * " "
            print(f'{strings[1]}{space_length}{strings[0]}')
            total += float(strings[0])
            strings.clear()
        total = "{:.2f}".format(total)
        output = f'Total: {total}'
        return output

    def deposit(self, amount_deposited, description=""):

        self.amount_deposited += amount_deposited
        self.ledger.append({"amount": amount_deposited,
                           "description": description})

    def withdraw(self, amount_withdrawn, description=""):
        if self.check_funds(amount_withdrawn) is False:
            return False
        else:
            if self.amount_deposited - amount_withdrawn < 0:
                return False
            else:
                self.amount_withdrawn += amount_withdrawn
                self.ledger.append(
                    {"amount": -amount_withdrawn, "description": description})
                self.spent += amount_withdrawn
                return True

    def get_balance(self):
        return self.amount_deposited-self.amount_withdrawn

    def transfer(self, amount_transfer, other_category):
        if self.check_funds(amount_transfer) is False:
            return False
        else:
            if self.withdraw(amount_transfer, f'Transfer to {other_category.name}') is False:
                return False
            else:
                other_category.deposit(
                    amount_transfer, f'Transfer from {self.name}')
                return True

    def check_funds(self, amount_check):
        if self.get_balance() < amount_check:
            return False
        return True


def create_spend_chart(*categories):
    total_amount = 0
    final_list = list()
    for category_index in range(0, len(categories)):
        for category in categories[category_index]:
            total_amount += float(category.spent)
            final_list.append([category.name, category.spent])

    for final_list_index in range(0, len(final_list)):
        final_list[final_list_index][1] = int(
            round((final_list[final_list_index][1]/total_amount) * 100, -1))
        set_number = final_list[final_list_index][1]

    # Starting Final Output Print
    set_up_numbers = 100
    for time_through_loop in range(0, 11):
        upper_lines = f'{set_up_numbers}|'.rjust(4, " ")
        for final_list_index in range(0, len(final_list)):
            if set_up_numbers <= final_list[final_list_index][1]:
                zero = "o"
                upper_lines += f" {zero}"
            else:
                zero = " "
                upper_lines += f" {zero}"
        set_up_numbers -= 10

    max_length = 0
    for final_list_index in range(0, len(final_list)):
        comparison_length = len(final_list[final_list_index][0])
        if max_length == 0 or comparison_length > max_length:
            max_length = comparison_length

    for letter_index in range(0, max_length):
        lower_lines = f''.rjust(4, " ")
        for final_list_index in range(0, len(final_list)):
            try:
                lower_lines += f"{final_list[final_list_index][0][letter_index]}".rjust(
                    2, " ")
            except:
                lower_lines += f"".rjust(2, " ")
    return ""


food = Category("Food")
entertainment = Category("Entertainment")
business = Category("Business")
food.deposit(900, "Deposit")
food.withdraw(100, 'Birthday Gift')
food.transfer(255.55, business)
entertainment.deposit(900, "deposit")
business.deposit(900, "deposit")

entertainment.withdraw(20)
business.withdraw(10.99)
print("\n")
print(f'{food}\n')
