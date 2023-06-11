from gc import collect
import turtle
import random
from turtle import Turtle, Screen

screen = Screen()
screen.screensize(500, 500)
screen.title("Turtle Race")
screen.tracer(1)

# Nicks Turtle
t = Turtle("turtle")
t.penup()
t.goto(-200, 0)
t.color('green')
t.shape("turtle")
t.setheading(90)
t.speed(5)
score_nick = -1

# Opponents Turtle
c = Turtle("turtle")
c.penup()
c.goto(+200, 0)
c.color('red')
c.shape("turtle")
c.setheading(90)
c.speed(0)
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
board.write("Get Ready!", align="center",
            font=("Courier", 24, "normal"))


def move_left_nick():
    global userDirection
    userDirection = "LEFT"


def move_right_nick():
    global userDirection
    userDirection = "RIGHT"


def move_up_nick():
    global userDirection
    userDirection = "UP"


def move_down_nick():
    global userDirection
    userDirection = "DOWN"


def center_nick():
    t.setheading(180)
    t.setpos(0, 0)


def user_movement():
    global userDirection
    if userDirection == "RIGHT":
        t.setheading(0)
        x = t.xcor()
        x += 20
        t.setx(x)
    elif userDirection == "LEFT":
        t.setheading(180)
        x = t.xcor()
        x -= 20
        t.setx(x)
    elif userDirection == "UP":
        t.setheading(90)
        y = t.ycor()
        y += 20
        t.sety(y)
    else:
        t.setheading(270)
        y = t.ycor()
        y -= 20
        t.sety(y)


def automatic_movement():
    global choseDirection
    global direction
    global error
    x = abs(c.xcor()-ball.xcor())
    y = abs(c.ycor()-ball.ycor())
    x_n = abs(c.xcor()-ball.xcor() + 20)
    y_n = abs(c.ycor()-ball.ycor() + 20)

    if not choseDirection:
        choseDirection = True
        if x >= y:
            if x_n > x:
                # Go Left
                direction = "LEFT"
                c.setheading(180)
            else:
                # Go Right
                direction = "RIGHT"
                c.setheading(0)
        else:
            if y_n > y:
                # Go Down
                direction = "DOWN"
                c.setheading(270)
            else:
                # Go Up
                direction = "UP"
                c.setheading(90)
    else:
        if direction == "LEFT" or direction == "RIGHT":
            if x > error:
                if direction == "LEFT":
                    # Go Left
                    c.setheading(180)
                else:
                    # Go Right
                    c.setheading(0)
            else:
                if y_n > y:
                    # Go Down
                    direction = "DOWN"
                    c.setheading(270)
                else:
                    # Go Up
                    direction = "UP"
                    c.setheading(90)
        else:
            if y > error:
                if direction == "UP":
                    # Go Up
                    c.setheading(90)
                else:
                    # Go Down
                    c.setheading(270)
            else:
                if x_n > x:
                    # Go Left
                    direction = "LEFT"
                    c.setheading(180)
                else:
                    # Go Right
                    direction = "RIGHT"
                    c.setheading(0)
    c.forward(20)


def constraints():
    global error
    global choseDirection

    if t.xcor() > 360:
        t.setx(360)
    elif t.xcor() < -360:
        t.setx(-360)
    elif t.ycor() > 300:
        t.sety(300)
    elif t.ycor() < -300:
        t.sety(-300)

    if c.xcor() > 360:
        choseDirection = False
        c.setx(360)
    elif c.xcor() < -360:
        choseDirection = False
        c.setx(-360)
    elif c.ycor() > 300:
        choseDirection = False
        c.sety(300)
    elif c.ycor() < -300:
        choseDirection = False
        c.sety(-300)


turtle.listen()
turtle.onkey(move_left_nick, "a")
turtle.onkey(move_right_nick, "d")
turtle.onkey(move_up_nick, "w")
turtle.onkey(move_down_nick, "s")
turtle.onkey(center_nick, "space")

choseDirection = True
userDirection = "RIGHT"
direction = "LEFT"
error = 15
endScore = 10


while True:
    screen.update()
    automatic_movement()
    user_movement()
    constraints()

    collected = False
    if abs(ball.xcor() - t.xcor()) < error and abs(ball.ycor() - t.ycor()) < error:
        collected = True
        board.clear()
        score_nick += 1
        board.write("Nick: {} Opponent: {}".format(score_nick, score_opponent), align="center",
                    font=("Courier", 24, "normal"))
        choseDirection = False
        ball.setpos(random.randrange(-360, 360, 20),
                    random.randrange(-300, 300, 20))
    if abs(ball.xcor() - c.xcor()) < error and abs(ball.ycor() - c.ycor()) < error and not collected:
        board.clear()
        score_opponent += 1
        board.write("Nick: {} Opponent: {}".format(score_nick, score_opponent), align="center",
                    font=("Courier", 24, "normal"))
        choseDirection = False
        ball.setpos(random.randrange(-360, 360, 20),
                    random.randrange(-300, 300, 20))

    if score_opponent == endScore or score_nick == endScore:
        board.clear()
        if score_opponent == endScore:
            board.write("Opponent Wins!", align="center",
                        font=("Courier", 24, "normal"))
        else:
            board.write("You Win!", align="center",
                        font=("Courier", 24, "normal"))
        turtle.exitonclick()
