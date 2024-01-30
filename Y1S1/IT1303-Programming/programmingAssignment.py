## imports

from colorama import Fore, Style
from tabulate import tabulate
import datetime
import json
import time
import re
import random
import string

## initial variables
tempDict = []
matchingIndices = []
keyword = None
dataTypeIndices = [3]
clear = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n---------------------------------------"
backButton = "#"
## data load

while True:
    print("\n( A ) Backup Data ( given project data )")
    print("( B ) Saved Data")
    print("( # ) Quit Program\n")
    userInput = input("Which database would you like to load from?: ")
    print(clear)
    if userInput == "A":
        with open("database/backupData.txt", "r") as file:
            tempString = file.read()
            tempDict = json.loads(tempString)
            break
    elif userInput == "B":
        with open("database/savedData.txt", "r") as file:
            tempString = file.read()
            tempDict = json.loads(tempString)
            break
    elif userInput == "#":
        quit()
    else:
        print("Invalid Option chosen, redirecting you back.", end="")
        time.sleep(1)
        print(".", end="")
        time.sleep(1)
        print(".\n")
#### setting variables
itemsPerPage = 3
currentPage = 1
selectedBook = None
selectedTiming = None
totalPages = (len(tempDict) + itemsPerPage - 1) // itemsPerPage
## functions
#### miscellaneous functions
###### view book all

def isInt(value):
    try:
        int(value)
        return True
    except ValueError:
        return False

def printPage(data, pageNum, itemsPerPage):
    startIndex = (pageNum - 1) * itemsPerPage
    endIndex = startIndex + itemsPerPage
    currentPageData = data[startIndex:endIndex]


    headers = ["", "ISBN No.", "Book Title", "Book Type", "Book Quantity"]
    numberedData = [["( " + str(i + 1) + " )"] + row for i, row in enumerate(currentPageData)]
    table = tabulate(numberedData, headers=headers, tablefmt="simple", stralign="left")
    print(table)

######
#### menu functions and classes
class Option:
    def __init__(self, description, action, header=None, args=None ):
        self.description = description
        self.action = action
        self.header = header
        self.args = args

    def execute(self):
        if self.args is None:
            self.action()
        else:
            self.action(*self.args)

def selection(option):
    global clear, backButton
    while True:
        showOptions(option)
        choice = input("Selection?: ")
        print(clear)
        if choice == backButton:
            break
        elif choice in option:
            selectedOption = option[choice]
            selectedOption.execute()
        else:
            errorDiagnose("Invalid input. Please select a valid option.")

def selectionAlt(option):
    global currentPage, itemsPerPage, selectedBook, selectedTiming, totalPages, clear, backButton
    totalPages = (len(tempDict) + itemsPerPage - 1) // itemsPerPage
    while True:
        showOptions(option)
        choice = input("Selection?: ")
        print(clear)
        if choice == backButton:
            break
        elif isInt(choice):
            if int(choice) > 0 and int(choice) <= itemsPerPage:
                selectedBook = tempDict[(itemsPerPage*(currentPage-1))+(int(choice)-1)][0]
                selectedTiming = datetime.datetime.now()
                selection(updateOrRemoveOptions)
            else:
                errorDiagnose("Invalid input. Please select a valid option.")
        elif choice in option:
            selectedOption = option[choice]
            selectedOption.execute()
        else:
            errorDiagnose("Invalid input. Please select a valid option.")

def showOptions(option):
    global backButton
    for key, value in option.items():
        if key == "header" or key[:4] == "text":
            print(value + "\n")
        elif key[:7] == "textAlt":
            print(value, end="")
        elif key[:12] == "volatileText":
            value()
        elif value.description[:4] == "/end":
            print(f"( {key} ) {value.description[4:]}", end="")
        else:
            print(f"( {key} ) {value.description}")
    if option == menuOptions:
        print("\n( " + backButton + " ) Log Out without Saving")
    elif option == viewBookListAltOptions:
        print("( " + backButton + " ) Back")
    else:
        print("\n( " + backButton + " ) Back")

def argumentRetriever(option, optionNo):
    x = option.get(optionNo)
    if x:
        variable_string = x.description
        return variable_string
    else:
        return "Invalid option number"

def errorDiagnose(string):
    print(string, end="")
    time.sleep(1)
    print(".", end="")
    time.sleep(1)
    print(".\n")

def generate_random_4_digit_number():
    return random.randint(1000, 9999)

#### menu option functions
## redirects


def editBookRedirect():
    selection(editBookOptions)

def nilOption():
    print("Option not implemented.")

def othersRedirect():
    selection(otherOptions)

def viewBookListAltOptionsRedirect():
    selectionAlt(viewBookListAltOptions)

## #normal functions
def removeHyphensFromIsbnList(bookList):
    for book in bookList:
        isbnIndex = 0  # Assuming ISBN is the first element in each sublist
        if isbnIndex < len(book):
            book[isbnIndex] = book[isbnIndex].replace("-", "")
            book[isbnIndex] = book[isbnIndex].replace(" ", "")

def editBooksPerPage():
    global clear, backButton
    while True:
        global itemsPerPage
        print(otherOptions["header"] + " > " + argumentRetriever(otherOptions, "1"))
        print(f"Current Books per Page: {itemsPerPage} \n")
        print("Type ( " + backButton + " ) to go back.")
        userInput = input("Change book amount per page to?: ")
        print(clear)
        if isInt(userInput):
            if int(userInput) <= 0:
                errorDiagnose("Invalid input, items per page must be more than 0.")
            else:
                itemsPerPage = int(userInput)
                break
        elif userInput == backButton:
            break
        else:
            errorDiagnose("Invalid input, please select a valid option.")

def viewBookListAlt():
    global currentPage, itemsPerPage, selectedBook, selectedTiming
    totalPages = (len(tempDict) + itemsPerPage - 1) // itemsPerPage

    printPage(tempDict, currentPage, itemsPerPage)
    if currentPage == totalPages and (len(tempDict) % itemsPerPage) != 0:
        print(f"\nPage No. {currentPage} | Total Page(s): {totalPages}\n( 1 - {len(tempDict) % itemsPerPage} ) Edit Book via Index")
    else:
        print(f"\nPage No. {currentPage} | Total Page(s): {totalPages}\n( 1 - {itemsPerPage} ) Edit Book via Index")

def pageEdit():
    global currentPage, itemsPerPage, clear, backButton
    totalPages = (len(tempDict) + itemsPerPage - 1) // itemsPerPage
    while True:
        print(viewBookListAltOptions["header"] + " > Input Page Search" + "\n")
        print(f"( 1 - {totalPages} ) Redirect to Page")
        print("( " + backButton + " ) Back to Book List \n")

        userInput = input("Selection?: ")
        if isInt(userInput):
            if int(userInput) > 0 and int(userInput) <= totalPages:
                currentPage = int(userInput)
                print(clear)
                break
            else:
                print(clear)
                errorDiagnose("Invalid input, please select a valid option.")
        elif userInput == backButton:
            print(clear)
            break
        else:
            print(clear)
            errorDiagnose("Invalid input, please select a valid option.")

def nextPage():
    global currentPage, totalPages
    if currentPage == totalPages:
        errorDiagnose("Invalid input, already at the last page.")
    else:
        currentPage = min(currentPage + 1, totalPages)

def previousPage():
    global currentPage, totalPages
    if currentPage == 1:
        errorDiagnose("Invalid input, already at the first page.")
    else:
        currentPage = max(currentPage - 1, 1)

def editBookTitle():
    global tempDict, selectedBook, clear, backButton

    for book in tempDict:
        if book[0] == selectedBook:
            print("Type ( " + backButton + " ) to go back.\n")
            print(f"ISBN Number: {book[0]}")
            print(f"Current Book Title: {book[1]}")
            userInput = input("New Book Title?: ")

            if userInput == backButton:
                print(clear)
                return
            else:
                while True:
                    randomNo = generate_random_4_digit_number()
                    userInput2 = input(f"To confirm the title edit to {userInput}, type {randomNo}. Input: ")
                    if userInput2 == str(randomNo):
                        book[1] = userInput
                        errorDiagnose("Successful edit, redirecting you back.")
                        print(clear)
                        return
                    else:
                        errorDiagnose("Failed Verification, redirecting you back.")
                        print(clear)
                        return
    print("Book with the given ISBN not found.")
def removeBook():
    global selectedBook, tempDict, backButton
    while True:
        randomNo = generate_random_4_digit_number()
        print("Type ( " + backButton + " ) to go back.\n")
        userInput = input(f"To confirm the removal of the book, type {randomNo}: ")
        print(clear)
        if userInput == backButton:
            return
        elif isInt(userInput):
            if int(userInput) == randomNo:
                tempDict = [item for item in tempDict if item[0] != selectedBook]
                errorDiagnose("Successful removal, redirecting you back.")
                return
            else:
                errorDiagnose("Failed confirmation, redirecting you back.")
                continue
        else:
            errorDiagnose("Failed confirmation, redirecting you back.")
            continue

def editBookISBN():
    global tempDict, selectedBook, clear, backButton

    for book in tempDict:
        if book[0] == selectedBook:
            while True:
                print("Type ( " + backButton + " ) to go back.\n")
                print(f"ISBN Number: {book[0]}")
                print(f"Current Book Title: {book[1]}")
                print("New ISBN number must be: ")
                print("- 13 Digits Long ")
                print("- Include ( - ) between the third and fourth number\n")
                userInput = input("New ISBN Number?: ")

                if userInput == backButton:
                    print(clear)
                    return
                elif len(userInput) != 14:
                    print(clear)
                    errorDiagnose("ISBN Number must be 14 characters long, 13 digits + 1 hyphen.")
                    pass
                elif userInput[3] != "-":
                    print(clear)
                    errorDiagnose("Fourth character must be a hyphen")
                    pass
                else:
                    while True:
                        print(clear)
                        randomNo = generate_random_4_digit_number()
                        userInput2 = input(f"To confirm the ISBN number edit to {userInput}, type {randomNo}. Input: ")
                        if userInput2 == str(randomNo):
                            book[0] = userInput
                            errorDiagnose("Successful edit, redirecting you back.")
                            print(clear)
                            return
                        else:
                            errorDiagnose("Failed Verification, redirecting you back.")
                            print(clear)
                            return
    print("Book with the given ISBN not found.")

def editBookType():
    global tempDict, selectedBook, clear, backButton

    for book in tempDict:
        if book[0] == selectedBook:
            while True:
                print("Type ( " + backButton + " ) to go back.\n")
                print(f"ISBN Number - {book[0]}")
                print(f"Current Book Title - {book[1]}")
                print(f"Current Book Type - {book[2]}\n")
                print("New Book Type must be one of the following: ")
                print("- eBook ")
                print("- Hard Cover ")
                print("- Paper Back\n")
                userInput = input("New Book Type? : ")

                if userInput == backButton:
                    print(clear)
                    return
                elif not userInput == "eBook" or userInput == "Hard Cover" or userInput == "Paper Back":
                    print(clear)
                    errorDiagnose("Input does not have one of the three options.")
                else:
                    while True:
                        print(clear)
                        randomNo = generate_random_4_digit_number()
                        userInput2 = input(f"To confirm the Book Type edit to {userInput}, type {randomNo}. Input: ")
                        if userInput2 == str(randomNo):
                            book[2] = userInput
                            errorDiagnose("Successful edit, redirecting you back.")
                            print(clear)
                            return
                        else:
                            errorDiagnose("Failed Verification, redirecting you back.")
                            print(clear)
                            return
    print("Book with the given ISBN not found.")

def editBookQuantity():
    global tempDict, selectedBook, clear, backButton

    for book in tempDict:
        if book[0] == selectedBook:
            while True:
                print("Type ( " + backButton + " ) to go back.\n")
                print(f"ISBN Number - {book[0]}")
                print(f"Current Book Title - {book[1]}")
                print(f"Current Book Quantity - {book[3]}\n")

                userInput = input("New Book Quantity?: ")

                if userInput == backButton:
                    print(clear)
                    return
                elif isInt(userInput) == False:
                    print(clear)
                    errorDiagnose("Input must be a number.")
                else:
                    while True:
                        print(clear)
                        randomNo = generate_random_4_digit_number()
                        userInput2 = input(f"To confirm the Book Quantity number edit to {userInput}, type {randomNo}. Input: ")
                        if userInput2 == str(randomNo):
                            book[3] = userInput
                            errorDiagnose("Successful edit, redirecting you back.")
                            print(clear)
                            return
                        else:
                            errorDiagnose("Failed Verification, redirecting you back.")
                            print(clear)
                            return
    print("Book with the given ISBN not found.")

def selectedBookInfo():
    global selectedBook
    for book in tempDict:
        if book[0].strip() == selectedBook:
            print("ISBN No:", book[0].strip())
            print("Book Title:", book[1].strip())
            print("Book Type:", book[2].strip())
            print("Book Quantity:", book[3], "\n")
            return

    print("Book with ISBN", selectedBook, "not found.")

def is_valid_10_digit_isbn(isbn):
        isbn = isbn.replace("-", "").replace(" ", "")  # Remove dashes and spaces
        if len(isbn) != 10 or not isbn[:-1].isdigit():
            return False

        total = 0
        for i in range(9):
            total += int(isbn[i]) * (10 - i)

        check_digit = (11 - (total % 11)) % 11
        return check_digit == int(isbn[9]) or (check_digit == 10 and isbn[9] == 'X')

def is_valid_13_digit_isbn(isbn):
        isbn = isbn.replace("-", "").replace(" ", "")  # Remove dashes and spaces
        if len(isbn) != 13 or not isbn.isdigit():
            return False

        total = 0
        for i in range(12):
            if i % 2 == 0:
                total += int(isbn[i])
            else:
                total += int(isbn[i]) * 3

        check_digit = (10 - (total % 10)) % 10
        return check_digit == int(isbn[12])

def validate_isbn():
    global tempDict
    invalid_isbns = []



    for item in tempDict:
        isbn = item[0]
        if not (is_valid_10_digit_isbn(isbn) or is_valid_13_digit_isbn(isbn)):
            invalid_isbns.append((isbn, item[1]))

    table_data = []
    for index, (isbn, title) in enumerate(invalid_isbns, start=1):
        table_data.append([index, isbn, title])

    table_headers = ["#", "Invalid ISBN(s)", "Book Title"]
    if table_data == []:
        print("No invalid ISBN found.\n")
    else:
        print(tabulate(table_data, headers=table_headers, tablefmt="simple"))
        print("")

def calculate_isbn_check_digit(isbn):
    isbn = isbn.replace("-", "").replace(" ", "")  # Remove hyphens and spaces
    total = 0

    if len(isbn) == 10:
        for i in range(9):
            digit = int(isbn[i])
            total += (10 - i) * digit

        check_digit = (11 - (total % 11)) % 11
        return str(check_digit) if check_digit != 10 else "X"
    elif len(isbn) == 13:
        for i in range(12):
            digit = int(isbn[i])
            total += digit if i % 2 == 0 else digit * 3

        check_digit = (10 - (total % 10)) % 10
        return str(check_digit)
    else:
        return None  # Invalid ISBN length

def fix_isbn_list():
    global tempDict

    for item in tempDict:
        incorrect_isbn = item[0]
        correct_isbn = incorrect_isbn[:-1] + calculate_isbn_check_digit(incorrect_isbn)
        item[0] = correct_isbn

def isbnSearch():
    global matchingIndices, tempDict

    keywordLower = keyword.lower()
    pattern = re.compile(re.escape(keyword), re.IGNORECASE)

    for idx, bookData in enumerate(tempDict):
        isbn = bookData[0]
        dataTypes = [str(bookData[index]) for index in dataTypeIndices]

        if any(pattern.search(dataTypeSearch.lower()) for dataTypeSearch in dataTypes):
            matchingIndices.append(idx)
    return matchingIndices

def keywordSearch():
    global keyword, matchingIndices
    matchingIndices = []
    matchingIndices = isbnSearch()

    if matchingIndices:
        matchingData = []

        for idx, dataIndex in enumerate(matchingIndices, start=1):
            isbn, bookName, bookType, bookQuantity = tempDict[dataIndex][:4]

            highlighted_values = [isbn, bookName, bookType, str(bookQuantity)]
            for i in dataTypeIndices:
                highlighted_values[i] = re.sub(
                    re.escape(keyword),
                    f"{Fore.YELLOW}{Style.BRIGHT}{keyword}{Style.RESET_ALL}",
                    highlighted_values[i],
                    flags=re.IGNORECASE
                )

            matchingData.append([f"( {idx} )"] + highlighted_values)

        if matchingData:
            headers = ["", "Matching ISBN(s)", "Book Name", "Book Type", "Book Quantity"]
            print(tabulate(matchingData, headers=headers, tablefmt="simple", colalign="right"))
        else:
            print("No matches found.")
    else:
        print("No matches found.")
    print("")

def userInput01(a,b):
    global keyword, dataTypeIndices, matchingIndices
    dataTypeIndices = [a]
    print(editBookOptions["header"] + " > " + argumentRetriever(editBookOptions, str(a+1)) + "\n")

    userInput = input(b)
    print(clear)
    keyword = userInput

def selectionAlt1(option):
    global selectedBook, selectedTiming, clear
    while True:
        showOptions(option)
        choice = input("Selection?: ")
        print(clear)
        if choice == '#':
            break
        elif isInt(choice):
            choice = int(choice) - 1
            if int(choice) >= 0 and int(choice) <= len(matchingIndices):
                selectedBook = tempDict[matchingIndices[int(choice)]][0]
                selectedTiming = datetime.datetime.now()
                selection(updateOrRemoveOptions)
            else:
                errorDiagnose("Invalid input. Please select a valid option.")
        elif choice in option:
            selectedOption = option[choice]
            selectedOption.execute()
        else:
            errorDiagnose("Invalid input. Please select a valid option.")

def checkString(input_string):
    # Check if the argument has less than 15 characters
    if len(input_string) > 14:
        errorDiagnose("ISBN Search should only have 14 characters or less.")
        return True
    else:
        pass

    # Check if the argument has only allowed characters
    allowed_characters = "0123456789-xX "
    if all(char in allowed_characters for char in input_string):
        pass
    else:
        errorDiagnose("ISBN Search should only contain 0-9, '-' or ' ', 'x' or 'X'.")
        return True

    # Check if there is only one or zero of "-" or " ", "x", "X"
    if input_string.count('-') + input_string.count(' ') <= 1:
        pass
    else:
        errorDiagnose("ISBN Search should only one '-' or " "")
        return True

    if input_string.count('x') + input_string.count('X') <= 1:
        pass
    else:
        errorDiagnose("ISBN Search should only one '-' or " "")
        return True


    # Check if more than 10 characters and "-" or " " present, and "-" or " " has less than four characters to the left
    if '-' in input_string or ' ' in input_string:
        index = max(input_string.rfind('-'), input_string.rfind(' '))
        if index >= 4:
            errorDiagnose("Invalid ISBN Search, anomaly placement of ' ' or '-'.")
            return True

    # Check if "X" or "x" is the last character
    if 'X' in input_string or 'x' in input_string:
        if input_string[-1] == 'X' or input_string[-1] == 'x':
            pass
        else:
            errorDiagnose("Invalid ISBN Search, anomaly placement of 'x' or 'X'.")
            return True

    return False

def editViaIsbnRedirect():
    global keyword
    while True:
        userInput01(0, "ISBN No.?: ")
        if checkString(keyword):
            continue
        else:
            keyword = keyword.replace(" ", "")
            keyword = keyword.replace("-", "")
            pass
        selectionAlt1(editBookViaISBNOptions)
        break

def editViaTitleRedirect():
    userInput01(1, "Book Title Keyword?: ")
    selectionAlt1(editBookViaTitleOptions)

def containsLettersOnly(input_string):
    return re.match(r'^[a-zA-Z]+$', input_string) is not None

def editViaTypeRedirect():
    global keyword
    while True:
        userInput01(2, "Book Type? ( eBook, Paper Back, Hard Cover ): ")
        if containsLettersOnly(keyword):
            if keyword.lower == "ebook" or keyword.lower == "paper back" or keyword.lower == "hard cover":
                selectionAlt1(editBookViaTypeOptions)
            else:
                errorDiagnose("Invalid option given.")
                continue
        else:
            errorDiagnose("Invalid option given.")
            continue
        return

def editViaQuantityRedirect():
    global keyword
    while True:
        userInput01(3, "Quantity?: ")
        if not isInt(keyword):
            errorDiagnose("Input not a number.")
            continue
        elif int(keyword) < 0:
            errorDiagnose("Input cannot be less than zero.")
            continue
        else:
            pass
        selectionAlt1(editBookViaQuantityOptions)
        break

def validateAllRedirect():
    errorDiagnose("Validating ISBN numbers through database.")
    selection(validateOptions)

def button01():
    global matchingIndices
    if matchingIndices == []:
        return
    else:
        if len(matchingIndices) == 1:
            print(f"( 1 ) Edit Book via Index", end="")
        else:
            print(f"( 1 - {len(matchingIndices)} ) Edit Book via Index", end="")

def getBookDetails():
    def calculate_isbn10_check_digit(isbn):
        total = 0
        for i in range(9):
            total += int(isbn[i]) * (i + 1)
        check_digit = total % 11
        return "X" if check_digit == 10 else str(check_digit)

    def calculate_isbn13_check_digit(isbn):
        total = 0
        for i in range(12):
            total += int(isbn[i]) * (1 if i % 2 == 0 else 3)
        check_digit = (10 - (total % 10)) % 10
        return str(check_digit)

    global tempDict, backButton
    while True:
        print(menuOptions["header"] + " > " + argumentRetriever(menuOptions, "3") + " Step 1 / 5\n")
        isbn = input("Enter ISBN (or '" + backButton + "' to exit): ").replace(" ", "").replace("-", "")
        print(clear)
        if isbn == backButton:
            return
        elif not (len(isbn) == 10 or len(isbn) == 13) or not isbn.isdigit():
            if isbn[:-1].isdigit() and isbn[-1] == "X" or isbn[:-1].isdigit() and isbn[-1] == "x":
                break
            else:
                errorDiagnose("Invalid ISBN. Please enter a valid 10-digit or 13-digit number.")
                continue
        else:
            for book in tempDict:
                if isbn == book[0]:
                    errorDiagnose("ISBN already exists in database, do enter a unused ISBN.")
                    continue
        break

    while True:
        print(menuOptions["header"] + " > " + argumentRetriever(menuOptions, "3") + " Step 2 / 5\n")
        name = input("Enter book name (or '" + backButton + "' to exit): ")
        print(clear)
        if name == backButton:
            return
        elif not name:
            errorDiagnose("Book name cannot be empty.")
            continue
        else:
            break
    while True:
        print(menuOptions["header"] + " > " + argumentRetriever(menuOptions, "3") + " Step 3 / 5\n")
        bookType = input("Enter book type (eBook, Hard Cover, Paper Back) (or '" + backButton + "' to exit): ")
        print(clear)
        if bookType == backButton:
            return
        elif bookType not in ["eBook", "Hard Cover", "Paper Back"]:
            errorDiagnose("Invalid book type. Please enter eBook, Hard Cover, or Paper Back.")
            continue
        else:
            break
    while True:
        print(menuOptions["header"] + " > " + argumentRetriever(menuOptions, "3") + " Step 4 / 5\n")
        quantity = input("Enter quantity (or '" + backButton + "' to exit): ")
        print(clear)
        if quantity == backButton:
            return
        elif not quantity.isdigit():
            errorDiagnose("Invalid quantity. Please enter a valid number.")
            continue
        else:
            break
    while True:
        print(menuOptions["header"] + " > " + argumentRetriever(menuOptions, "3") + " Step 5 / 5\n")
        print(f"To confirm the Book Creation of:\nBook ISBN: {isbn}\nBook Name: {name}\nBook Type: {bookType}\nBook Quantity: {quantity}")
        randomNo = generate_random_4_digit_number()
        userInput = input(f"\nType {randomNo} to confirm: ")
        print(clear)
        if userInput == str(randomNo):
            errorDiagnose("Successful edit, redirecting you back.")
            tempList = [isbn, name, bookType, int(quantity)]
            tempDict.append(tempList)
            print(clear)
            return
        elif userInput == "x" or userInput == "X":
            print(clear)
            return
        else:
            errorDiagnose("Failed Verification, retrying.")
            print(clear)
            continue

def changeKeybind():
    global backButton
    while True:
        print(otherOptions["header"] + " > " + argumentRetriever(otherOptions, "3"))
        print("")
        print("Type ( " + backButton + " ) to go back.")
        userInput = input("Change back keybind to?: ")
        print(clear)
        if userInput == backButton:
            return
        elif len(userInput) != 1:
            errorDiagnose("Keybind must only be one character.")
        elif not (userInput in list(string.ascii_uppercase) or userInput == "#"):
            errorDiagnose("Keybind currently can only be set to a capitalized alphabet or '#'.")
        else:
            backButton = userInput
            errorDiagnose("Keybind change successful.")
            return

def saveRedirect():
    selection(saveOptions)

def add_hyphen_to_isbn(isbn_list):
    modified_list = []
    for book in isbn_list:
        isbn = book[0]
        if len(isbn) == 13:
            modified_isbn = isbn[:3] + '-' + isbn[3:]
            modified_list.append([modified_isbn] + book[1:])
        else:
            modified_list.append(book)
    return modified_list

def saveToFile():
    global tempDict
    tempDict2 = []
    tempDict2 = add_hyphen_to_isbn(tempDict)
    tempDict2 = json.dumps(tempDict2, indent=1)
    with open("database/savedData.txt", 'w') as file:
        file.write(tempDict2)
    errorDiagnose("Saving Data.")
    print(clear)

def saveAndQuit():
    saveToFile()
    print(clear)
    errorDiagnose("Exiting the program. Goodbye!")
    quit()

#### function run #1

removeHyphensFromIsbnList(tempDict)

#### Menu
## Layer 1 Node
menuOptions = {
    "header": "|| Library Management Menu",
    '1': Option('View/Edit Book(s) via Book List', viewBookListAltOptionsRedirect),
    '2': Option('Book Search', editBookRedirect),
    '3': Option('Add New Book', getBookDetails),
    '4': Option('Others', othersRedirect),
    '5': Option('Save Options', saveRedirect),
}
saveOptions = {
    "header": menuOptions["header"] + " > " + argumentRetriever(menuOptions, "5"),
    "1": Option("Save database ( Saved Data )", saveToFile),
    "2": Option("Save database ( Saved Data ) and Log Out", saveAndQuit),
}
#### Layer 2 Nodes
## Layer 2 Node ( 1 )

## Layer 2 Node ( 2 )
editBookOptions = {
    "header": menuOptions["header"] + " > " + argumentRetriever(menuOptions, "2"),
    "text": "How to search and select book by?: ",
    "1": Option("Book Search via ISBN No.", editViaIsbnRedirect),
    "2": Option("Book Search via Book Title", editViaTitleRedirect),
    "3": Option("Book Search via Book Type", editViaTypeRedirect),
    "4": Option("Book Search via Book Quantity", editViaQuantityRedirect),
}

## Layer 2 Node ( 4 )
otherOptions = {
    "header": menuOptions["header"] + " > " + argumentRetriever(menuOptions, "4"),
    '1': Option("Change amount of books per page.", editBooksPerPage),
    '2': Option('Validate all ISBN with check number', validateAllRedirect),
    '3': Option('Change Back Keybind', changeKeybind),
}

## Layer 3 Node ( 42 )
validateOptions = {
    "header": otherOptions["header"] + " > " + argumentRetriever(otherOptions, "2"),
    "volatileText": validate_isbn,
    '1': Option("Resolve all incorrect ISBN check digits?", fix_isbn_list),
}

#### Layer 3 Nodes
## Layer 3 Node ( 13 )
viewBookListAltOptions = {
    "header": menuOptions["header"] + " > " + argumentRetriever(menuOptions, "1"),
    "volatileText": viewBookListAlt,
    ">": Option("/endNext Page   ", nextPage),
    "<": Option("Previous Page   ", previousPage),
    "/": Option("/endInput Page Search   ", pageEdit),
}

## Layer 3 Node ( 23 )
editBookViaISBNOptions = {
    "header": editBookOptions["header"] + " > " + argumentRetriever(editBookOptions, "1"),
    "volatileText": keywordSearch,
    "volatileText1": button01,
}

## Layer 3 Node ( 22 )
editBookViaTitleOptions = {
    "header": editBookOptions["header"] + " > " + argumentRetriever(editBookOptions, "2"),
    "volatileText": keywordSearch,
    "volatileText1": button01,
}

editBookViaTypeOptions = {
    "header": editBookOptions["header"] + " > " + argumentRetriever(editBookOptions, "3"),
    "volatileText": keywordSearch,
    "volatileText1": button01,
}

editBookViaQuantityOptions = {
    "header": editBookOptions["header"] + " > " + argumentRetriever(editBookOptions, "3"),
    "volatileText": keywordSearch,
    "volatileText1": button01,
}
# Generate and print a random 4-digit number


updateOrRemoveOptions = {
    "header": menuOptions["header"] + " > ... > " + "Edit Book Data",
    "volatileText": selectedBookInfo,
    '1': Option('Change ISBN Number', editBookISBN),
    '2': Option('Change Book Title', editBookTitle),
    '3': Option('Change Book Type', editBookType),
    '4': Option('Change Book Quantity', editBookQuantity),
    '5': Option('Remove Book', removeBook),
}

print("\n")
selection(menuOptions)

errorDiagnose("Exiting the program. Goodbye!")
