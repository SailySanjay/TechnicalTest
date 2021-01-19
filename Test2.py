from selenium import webdriver
import time
import re
import openpyxl
import xlsxwriter
import read_car_output


path = "car_output.xlsx"



workbook = xlsxwriter.Workbook("Registration.xlsx")
worksheet = workbook.add_worksheet('RNo')

f1 = open("C:\Input\car_input.txt", "r")
#f3 = open("C:\Input\car_output.txt", "r")

driver = webdriver.Chrome(executable_path="C:\Drivers\chromedriver.exe")

driver.get("https://cartaxcheck.co.uk/")


rowIndex = 1

for line in f1:
    regis = re.findall(r"[A-Z]{2}\d{2}\s?[A-Z]{3}", line)
    for i in regis:
        rno = i
        driver.find_element_by_name("vrm").send_keys(rno)
        driver.find_element_by_xpath("//*[@id='m']/div[2]/div/div/div/div/form/button").click()
        time.sleep(15)
        Registration = driver.find_element_by_css_selector(
            ".jsx-1488133405:nth-child(4) > .jsx-1843467667 .jsx-1915932805:nth-child(1) > .jsx-3496807389").text
        Make = driver.find_element_by_css_selector(
            ".jsx-1488133405:nth-child(4) > .jsx-1843467667 .jsx-1915932805:nth-child(2) > .jsx-3496807389").text
        Model = driver.find_element_by_css_selector(
            ".jsx-1488133405:nth-child(4) > .jsx-1843467667 .jsx-1915932805:nth-child(3) > .jsx-3496807389").text
        Colour = driver.find_element_by_css_selector(
            ".jsx-1843467667 .jsx-1915932805:nth-child(4) > .jsx-3496807389").text
        Year = driver.find_element_by_css_selector(
            ".jsx-1843467667 .jsx-1915932805:nth-child(5) > .jsx-3496807389").text

        rows = read_car_output.RowCnt(path, 'Sheet1')
        for r in range(2, rows + 1):
            regisNum = read_car_output.readOutput(path, "Sheet1", r, 1)
            if Registration == regisNum:
                makeVal = read_car_output.readOutput(path, "Sheet1", r, 2)
                modelVal = read_car_output.readOutput(path, "Sheet1", r, 3)
                colorVal = read_car_output.readOutput(path, "Sheet1", r, 4)
                yearVal = read_car_output.readOutput(path, "Sheet1", r, 5)
                if Make == makeVal and Model == modelVal and Colour == colorVal and Year == str(yearVal):
                    print("TEST PASS")
                    read_car_output.writeResult(path, "Sheet1", r, 6, "PASS")
                else:
                    print("TEST FAIL")
                    read_car_output.writeResult(path, "Sheet1", r, 6, "FAIL")
            else:
                if Registration == "BW57BOW":
                    print("Registration number was not in the car_input file")
                    read_car_output.writeResult(path, "Sheet1", r, 6, "Registration number was not in the car_input file")

        #print("\n" + rno)
        driver.find_element_by_css_selector(".nav-toggle").click()
        driver.find_element_by_link_text("Free Car Check").click()


f1.close()
driver.close()

