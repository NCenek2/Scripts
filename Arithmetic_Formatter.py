def arithmetic_arranger(problems, solve=False):
    pitch = ["+", "-", "", "*", "/", "//", "**"]
    numbers = ""
    operator = ""
    first_string = ""
    second_string = ""
    third_string = ""
    fourth_string = ""

    for index in range(0, len(problems)):
        for problem in problems[index]:
            if problem not in pitch:
                numbers += problem
            else:
                operator += problem
        first_number, second_number = numbers.split()
        # Error Markers
        if len(problems) > 5:
            print("Error: Too many problems.")
            break
        elif operator != "+" and operator != "-":
            print("Error: Operator must be '+' or '-'.")
            break
        elif len(first_number) > 4 or len(second_number) > 4:
            print("Error: Numbers cannot be more than four digits")
            break
        try:
            int(first_number)
            int(second_number)
        except:
            print("Error: Numbers must only contain digits.")
            break

        # Outputting New Solution
        if operator == "+":
            output_number = str(int(first_number) + int(second_number))
        else:
            output_number = str(int(first_number) - int(second_number))

        # Finding Spacing
        if len(first_number) >= len(second_number):
            max_length = len(first_number) + 2
        else:
            max_length = len(second_number) + 2
        first_spaces = (max_length - len(first_number)) * " "
        second_spaces = (max_length - len(second_number) - 1) * " "
        third_spaces = (max_length - len(output_number)) * " "
        dashes = "-" * max_length
        if index == len(problems) - 1:
            new_space = ""
        else:
            new_space = 4 * " "

        # Saving to Strings and Re-Packing Variables
        first_string += f"{first_spaces}{first_number}{new_space}"
        second_string += f"{operator}{second_spaces}{second_number}{new_space}"
        third_string += f"{dashes}{new_space}"
        fourth_string += f"{third_spaces}{output_number}{new_space}"
        numbers = ""
        operator = ""
    # Output Statement
    if solve is not True:
        return print(f"{first_string}\n{second_string}\n{third_string}")
    else:
        return print(f"{first_string}\n{second_string}\n{third_string}\n{fourth_string}")


arithmetic_arranger(['32 - 698', '1 - 3801', '45 + 43', '123 + 49', '988 + 40'], True)