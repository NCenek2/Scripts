import turtle, random
from turtle import Turtle, Screen

screen = Screen()
screen.screensize(500, 500)
screen.title("Turtle Race")
screen.tracer(1)


def turtles(number_characters):
    characters = ["one", "two", "three", "four"]

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
score_opponent = 0

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


def move_left_nick():
    t.setheading(180)
    x = t.xcor()
    x -= 20
    t.setx(x)


def move_right_nick():
    t.setheading(0)
    x = t.xcor()
    x += 20
    t.setx(x)


def move_up_nick():
    t.setheading(90)
    y = t.ycor()
    y += 20
    t.sety(y)


def move_down_nick():
    t.setheading(270)
    y = t.ycor()
    y -= 20
    t.sety(y)


def center_nick():
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


def constraints():
    if t.xcor() > 360:
        t.setx(360)
    elif t.xcor() < -360:
        t.setx(-360)
    elif t.ycor() > 300:
        t.sety(300)
    elif t.ycor() < -300:
        t.sety(-300)

    if abs(ball.xcor() - t.xcor()) < 5 and abs(ball.ycor() - t.ycor()) < 5:
        ball.setpos(random.randrange(-360, 360, 20), random.randrange(-300, 300, 20))

        board.clear()
        board.write("Nick: {} Opponent: {}".format(score_nick, score_opponent), align="center", font=("Courier", 24, "normal"))
    if abs(ball.xcor() - c.xcor()) < 5 and abs(ball.ycor() - c.ycor()) < 5:
        ball.setpos(random.randrange(-360, 360, 20), random.randrange(-300, 300, 20))
        board.clear()
        board.write("Nick: {} Opponent: {}".format(score_nick, score_opponent), align="center", font=("Courier", 24, "normal"))


turtle.listen()

turtle.onkeypress(move_left_nick, "a")
turtle.onkeypress(move_right_nick, "d")
turtle.onkeypress(move_up_nick, "w")
turtle.onkeypress(move_down_nick, "s")
turtle.onkeypress(center_nick, "space")


while True:
    screen.update()
    constraints()
    automatic_movement()

    if abs(ball.xcor() - t.xcor()) < 5 and abs(ball.ycor() - t.ycor()) < 5:
        ball.setpos(random.randrange(-360, 360, 20), random.randrange(-300, 300, 20))
        score_nick += 1
        board.clear()
        board.write("Nick: {} Opponent: {}".format(score_nick, score_opponent), align="center",
                    font=("Courier", 24, "normal"))
    if abs(ball.xcor() - c.xcor()) < 5 and abs(ball.ycor() - c.ycor()) < 5:
        ball.setpos(random.randrange(-360, 360, 20), random.randrange(-300, 300, 20))
        score_opponent += 1
        board.clear()
        board.write("Nick: {} Opponent: {}".format(score_nick, score_opponent), align="center",
                    font=("Courier", 24, "normal"))

    if score_opponent == 10 or score_nick == 10:
        board.clear()
        turtle.delay(5000)
        if score_opponent == 3:
            board.write("Opponent Wins!", align="center", font=("Courier", 24, "normal"))
        elif score_nick == 3:
            board.write("You Win!", align="center", font=("Courier", 24, "normal"))
        turtle.delay(5000)
        break
