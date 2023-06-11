from random import randint


class Hat:

    original_contents = list()
    contents = list()
    drawn = list()

    def __init__(self, **list_color):
        for keys, values in list_color.items():
            for _ in range(values):
                self.contents.append(keys)
                self.original_contents.append(keys)

    def get_contents(self):
        return print(self.contents)

    def draw(self, to_draw):
        if to_draw > len(self.contents):
            self.contents = self.original_contents
        else:
            for _ in range(to_draw):
                choice = randint(0, len(self.contents) - 1)
                self.drawn.append(self.contents[choice])
                self.contents.remove(self.contents[choice])


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    wanted = list()
    for key, value in expected_balls.items():
        for _ in range(value):
            wanted.append(key)

    count = 0
    times = 0
    # Simulates
    while times < num_experiments:
        # Resetting Drawn and Check Values from Previous
        hat.drawn = list()
        hat.draw(num_balls_drawn)
        check = list()
        for index in wanted:
            if index not in hat.drawn:
                continue
            else:
                hat.drawn.remove(index)
                check.append(index)
            if wanted == check:
                count += 1
        # "Resetting Values"
        for index in check:
            hat.contents.append(index)
        for index in hat.drawn:
            hat.contents.append(index)
        times += 1
    print(100 * (count / num_experiments))
    return 1


hat = Hat(red=3, blue=2, green=1)
probability = experiment(hat=hat,
                         expected_balls={"blue": 1, "red": 2, "green": 1},
                         num_balls_drawn=4, num_experiments=1000)

# hat.get_contents()
