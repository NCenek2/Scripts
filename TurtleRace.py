import turtle, random
from turtle import Turtle, Screen

screen = Screen()
screen.screensize(500, 500)
screen.title("Turtle Race")
screen.tracer(1)

def turtles(number_characters):
    characters = ["one", "two", "three", "four"]
    colors = ["red", "blue", "black", "white"]
    for index in range(0, number_characters):
        characters[index]

# Nicks Turtle
t = Turtle("turtle")
t.penup()
t.goto(-200, 0)
t.color('green')
t.shape("turtle")
t.setheading(90)
t.speed(-1)
score_nick = 0

# Opponents Turtle
c = Turtle("turtle")
c.penup()
c.goto(+200, 0)
c.color('red')
c.shape("turtle")
c.setheading(90)
c.speed()
c.penup()
score_benny = 0

# Ball Turtle
ball = Turtle("turtle")
ball.shape("circle")
ball.color("black")
ball.shapesize(0.5, 0.5, 0.5)
ball.penup()

# Score Board
board = Turtle("turtle")
board.speed(0)
board.color("black")
board.penup()
board.hideturtle()
board.goto(0, 260)
board.write("Nick: 0 Opponent: 0", align="center", font=("Courier", 24, "normal"))


def move_left_Nick():
    t.setheading(180)
    x = t.xcor()
    x -= 20
    t.setx(x)

def move_right_Nick():
    t.setheading(0)
    x = t.xcor()
    x += 20
    t.setx(x)

def move_up_Nick():
    t.setheading(90)
    y = t.ycor()
    y += 20
    t.sety(y)

def move_down_Nick():
    t.setheading(270)
    y = t.ycor()
    y -= 20
    t.sety(y)


def center_Nick():
    t.setheading(180)
    t.setpos(0, 0)

def automatic_movement():

    x = abs(c.xcor()-ball.xcor())
    y = abs(c.ycor()-ball.ycor())
    x_n = abs(c.xcor()+20-ball.xcor())
    y_n = abs(c.ycor()+20-ball.ycor())

    if x >= y:
        if x_n > x:
            c.setheading(180)
            c.forward(20)
        else:
            c.setheading(0)
            c.forward(20)
    else:
        if y_n > y:
            c.setheading(270)
            c.forward(20)
        else:
            c.setheading(90)
            c.forward(20)


# def move_left_Benny():
#     c.setheading(180)
#     x = c.xcor()
#     x -= 20
#     c.setx(x)

# def move_right_Benny():
#     c.setheading(0)
#     x = c.xcor()
#     x += 20
#     c.setx(x)

# def move_up_Benny():
#     c.setheading(90)
#     y = c.ycor()
#     y += 20
#     c.sety(y)

# def move_down_Benny():
#     c.setheading(270)
#     y = c.ycor()
#     y -= 20
#     c.sety(y)

# def center_Benny():
#     c.setheading(180)
#     c.setpos(0, 0)

def constraints():

    if t.xcor() > 360:
        t.setx(360)
    elif t.xcor() < -360:
        t.setx(-360)
    elif t.ycor() > 300:
        t.sety(300)
    elif t.ycor() < -300:
        t.sety(-300)

    # if c.xcor() > 360:
    #     c.setx(360)
    # elif c.xcor() < -360:
    #     c.setx(-360)
    # elif c.ycor() > 300:
    #     c.sety(300)
    # elif c.ycor() < -300:
    #     c.sety(-300)


    if abs(ball.xcor() - t.xcor()) < 5 and abs(ball.ycor() - t.ycor()) < 5:
        ball.setpos(random.randrange(-360, 360, 20), random.randrange(-300, 300, 20))

        board.clear()
        board.write("Nick: {} Opponent: {}".format(score_nick, score_benny), align="center", font=("Courier", 24, "normal"))
    if abs(ball.xcor() - c.xcor()) < 5 and abs(ball.ycor() - c.ycor()) < 5:
        ball.setpos(random.randrange(-360, 360, 20), random.randrange(-300, 300, 20))
        board.clear()
        board.write("Nick: {} Opponent: {}".format(score_nick, score_benny), align="center", font=("Courier", 24, "normal"))



turtle.listen()

turtle.onkeypress(move_left_Nick, "a")
turtle.onkeypress(move_right_Nick, "d")
turtle.onkeypress(move_up_Nick, "w")
turtle.onkeypress(move_down_Nick, "s")
turtle.onkeypress(center_Nick, "space")

# turtle.onkey(move_left_Benny, "Left")
# turtle.onkey(move_right_Benny, "Right")
# turtle.onkey(move_up_Benny, "Up")
# turtle.onkey(move_down_Benny, "Down")
# turtle.onkey(center_Benny, "/")


while True:
    screen.update()
    constraints()
    automatic_movement()

    if abs(ball.xcor() - t.xcor()) < 5 and abs(ball.ycor() - t.ycor()) < 5:
        ball.setpos(random.randrange(-360, 360, 20), random.randrange(-300, 300, 20))
        score_nick += 1
        board.clear()
        board.write("Nick: {} Opponent: {}".format(score_nick, score_benny), align="center",
                    font=("Courier", 24, "normal"))
    if abs(ball.xcor() - c.xcor()) < 5 and abs(ball.ycor() - c.ycor()) < 5:
        ball.setpos(random.randrange(-360, 360, 20), random.randrange(-300, 300, 20))
        score_benny += 1
        board.clear()
        board.write("Nick: {} Opponent: {}".format(score_nick, score_benny), align="center",
                    font=("Courier", 24, "normal"))

    if score_benny == 10 or score_nick == 10:
        board.clear()
        turtle.delay(5000)
        if score_benny == 3:
            board.write("Opponent Wins!", align="center", font=("Courier", 24, "normal"))
        elif score_nick == 3:
            board.write("You Win!", align="center", font=("Courier", 24, "normal"))
        turtle.delay(5000)
        break

# Pandemic Restrictions
# def move_up():
#     player_names[player_index].setheading(90)
#     y = player_names[player_index].ycor()
#     y += 20
#     player_names[player_index].sety(y)

# for keyboard
# turtle.onkeypress(move_right, "w")
# if turtle.onkeyrelease(releasing, "w"):
#     moves += 1
# for clicking
# if turtle.onscreenclick(releasing, 1):
#     moves += 1