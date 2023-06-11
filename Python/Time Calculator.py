def add_time(start_time, duration, day=""):

    # Changing Original Time to Army Time
    time, setting = start_time.split()
    hours, minutes = time.split(":")
    if setting == "AM":
        hours = int(hours)
        army_time_old = f'{hours}:{minutes}'
    else:
        hours = int(hours) + 12
        army_time_old = f'{hours}:{minutes}'

    # Original Time to Include Added Time
    added_hours, added_minutes = duration.split(":")
    new_minutes = int(added_minutes) + int(minutes)
    new_hours = int(added_hours) + hours
    new_time = f'{new_hours}:{new_minutes}'
    # print(new_time)

    # Converting back to AM and PM
    # Adding Minutes
    if new_minutes > 60:
        additional_hours = new_minutes // 60
        new_minutes = new_minutes % 60
        new_hours = additional_hours + new_hours
    if new_minutes < 10:
        new_minutes = "0" + str(new_minutes)

    # Adding Hours
    if new_hours == 0:
        hours += 12
        tag = "AM"
        days_later = 0
    elif 0 < new_hours < 12:
        tag = "AM"
        days_later = 0
    elif new_hours == 12:
        tag = "PM"
        days_later = 0
    elif 13 <= new_hours < 24:
        new_hours -= 12
        days_later = 0
        tag = "PM"
    elif new_hours >= 24:
        days_later = new_hours // 24
        new_hours = new_hours % 24
        if new_hours == 0:
            new_hours += 12
            tag = "AM"
        elif 0 < new_hours < 12:
            tag = "AM"
        elif new_hours == 12:
            tag = "PM"
        elif 13 <= new_hours < 24:
            tag = "PM"
        elif new_hours == 24:
            new_hours -= 24
            tag = "AM"

    # Printing Days Later
    if days_later == 1:
        output_days_later = "(next day)"
    elif days_later > 1:
        output_days_later = f'({days_later} days later)'
    else:
        output_days_later = ""

    # Day Output
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    if day != "":
        day = str(day).capitalize()
        index = days.index(day)
        if 1 <= days_later < 7:
            index = (index + days_later) % 7
            output_day = days[index]
        elif days_later >= 7:
            index = (index + days_later) % 7
            output_day = days[index]
        else:
            output_day = day

    # Final Time Print
    output_time = f'{new_hours}:{new_minutes} {tag}'

    # Final Print
    if day != "":
        new_time = f'{output_time}, {output_day} {output_days_later}'
    else:
        if output_days_later == "":
            new_time = f'{output_time}'
        else:
            new_time = '{output_time} {output_days_later}'

    return print(new_time)


add_time("3:30 PM", "12:12", "monDay")
# Returns 3:42 AM, Tuesday (next day)


