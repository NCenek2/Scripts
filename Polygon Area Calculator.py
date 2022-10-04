class Rectangle:

    def __init__(self, width, height):
        self.width = width
        self.height = height

    def __repr__(self):
        return f'{self.__class__.__name__}(width={self.width}, height={self.height})'

    def set_width(self, width):
        self.width = width

    def set_height(self, height):
        self.height = height

    def get_area(self):
        return self.width * self.height

    def get_perimeter(self):
        return 2 * self.width + 2 * self.height

    def get_diagonal(self):
        return (self.width ** 2 + self.height ** 2) ** 0.5

    def get_picture(self):
        if self.width > 50 or self.height > 50:
            return f'Too big for picture.'
        else:
            row = self.width * "*"
            col = self.height
            picture = ""
            for number in range(0, col):
                picture += f'{row}\n'
            return picture

    def get_amount_inside(self, obj):
        area1 = self.get_area()
        area2 = obj.get_area()
        total = area1 // area2
        return total


class Square(Rectangle):

    def __init__(self, side):
        self.width = side
        self.height = side

    def __repr__(self):
        return f'{self.__class__.__name__}(side={self.width})'

    def set_side(self, side):
        self.width = side
        self.height = side

rect = Rectangle(10,3)
rect.get_area()
rect.get_diagonal()
rect.get_perimeter()

rect.get_picture()
print(rect)
print(rect.get_picture())