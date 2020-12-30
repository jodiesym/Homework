#!/usr/bin/env python
# coding: utf-8

# In[1]:


from bs4 import BeautifulSoup as bsp
from IPython.display import HTML
import requests as r
import pandas as pd


# In[9]:


# connect Mars latest news site:
url="https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest"
result=r.get(url)
print(result.status_code)


# In[10]:


mars_news=result.text


# In[11]:


# use beautifulsoup
result_mars_news=bsp(mars_news,'html.parser')


# In[12]:


# search all news titles
news=result_mars_news.find_all('div',class_="content_title")


# In[13]:


# find the news title
news_t = news[0].a.text.replace("\n","")
news_t


# In[14]:


# search all news paragraphs
news_p=result_mars_news.find_all('div',class_="rollover_description_inner")


# In[15]:


news_p[0]


# In[16]:


# save the news paragraph and the title
news_para = "Starting July 27, news activities will cover everything from mission engineering and science to returning samples from Mars to, of course, the launch itself."
news_tittle = "NASA to Broadcast Mars 2020 Perseverance Launch, Prelaunch Activities"


# In[39]:


# JPL Mars Space Images - Featured Image
from splinter import Browser


# In[40]:


import os


# In[41]:


os.getcwd()


# In[42]:


executable_path = {'executable_path': 'c://Users/19543/UM_Data_BOOTCAMP/chromedriver.exe'}
browser = Browser('chrome', **executable_path, headless=False)


# In[22]:


browser.visit('https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars')


# In[24]:


html = browser.html
soup = bsp(html, 'html.parser')


# In[40]:


images = soup.find_all('img',class_='thumb')


# In[50]:


images


# In[42]:


len(images)


# In[48]:


jpg_image_list = []
jpg_list =[]

for image in images:
    
    jpg_list = image['src']
    jpg_image_list.append(jpg_list)
    
jpg_image = ['https://www.jpl.nasa.gov' + jpg for jpg in jpg_image_list]
    


# In[49]:


jpg_image


# In[4]:


# Mars Facts

facts_url = 'https://space-facts.com/mars/'


# In[6]:


tables = pd.read_html(facts_url)
tables[0]


# In[13]:


mars_table = tables[0]


# In[16]:


mars_table.columns = ['facts','results']


# In[17]:


mars_table


# In[18]:


# convert the pd table to html
mars_table.to_html("mars_facts.html")


# In[50]:


# Mars Weather
import time


# In[51]:


browser.visit('https://twitter.com/marswxreport?lang=en')
time.sleep(4)


# In[52]:


weather_html = browser.html
weather_soup = bsp(weather_html, 'html.parser')


# In[53]:


result_tweet = weather_soup.find_all('div',attrs={'data-testid':'tweet'})


# In[54]:


len(result_tweet)


# In[63]:


result_tweet[5].text


# In[70]:


tweet = result_tweet[5].text
tweet


# In[69]:


browser.quit()


# In[71]:


# Mars Hemispheres
# I have tried to conect the websit through splinter and request, and splinter crushed, request was really slow
# so I decided to manully go through the website and save pics: 


# In[74]:


hemisphere_image_urls = [
    {"title": "Cerberus Hemisphere Enhanced", "img_url": "https://astropedia.astrogeology.usgs.gov/download/Mars/Viking/cerberus_enhanced.tif/full.jpg"},
    {"title": "Syrtis Major Hemisphere Enhanced", "img_url": "https://astropedia.astrogeology.usgs.gov/download/Mars/Viking/syrtis_major_enhanced.tif/full.jpg"}
]


# In[ ]:





# In[ ]:




