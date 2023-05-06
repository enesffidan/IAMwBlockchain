from selenium import webdriver


class Github():

    def login(self, url,usernameId, username, passwordId, password, submit_buttonId):
        driver = webdriver.Firefox()
        driver.get(url)
        driver.find_element("id", usernameId).send_keys(username)
        driver.find_element("id", passwordId).send_keys(password)
        driver.find_element("name", submit_buttonId).click()