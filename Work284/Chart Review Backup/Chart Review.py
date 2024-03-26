#Program: Chart Review
#Created by: Steve Scott
#Date: 3/3/23

#Description:  GUI interface for Chart Review

#Revisions:
#3/3/23     Started program
#3/16/23    Used for the first time to generate summary and results emails


#Plans:



from tkinter import *
from tkinter import font
from tkinter import messagebox
from tkhtmlview import HTMLLabel, RenderHTML
from email.message import EmailMessage
import smtplib
import csv
import webbrowser
from random import random, shuffle
from datetime import datetime
from statistics import median
import os.path


f_month = "month.csv"
f_questions = "questions.csv"
f_providers = "providers.csv"
f_assigned = "assigned.csv"
f_unassigned = "unassigned.csv"
f_results = "results.csv"
f_resultssent = "resultssent.csv"
f_summary = "summary 2023-06.html"
f_survey = "survey.csv"
f_help = "help.html"
f_helpfiles = "helpfiles.html"
f_fix = "fix.txt"
f_fullnames = "fullnames.csv"
f_chartstoassign = "chartstoassign.csv"
f_rawcharts = "rawcharts.csv"
f_overview = "overview.txt"

f_generalteachingpoints = "general teaching points.txt"


confirmBeforeSending = True
currentProvider = ""
provider_list = []
question_text = []
month = ""
text = {}

class Provider:
    def __init__(self,x):
        self.last = x[1]
        self.first = x[0]
        self.email = x[2]
        self.job = x[3]
        self.isReviewee = x[4]
        self.isReviewer = x[5]
        self.code = x[6]
        self.date = []
        self.number = []
        self.reviewee = []
        self.charts = []
        self.assignedCharts = []
        self.optionalCharts = []
        self.chartscompleted = 0
        self.chartsassigned = 0
        self.theirchartsassignedtoothers = 0
        self.willingtodomore = "No"
        self.morecount = 0
        self.totaltime = 0
        self.improvementcomment = ''
        self.suggestedquestions = ''
        self.comments = Comments()
        self.ranking = 0

class Chart:
    def __init__(self,reviewer,last,number,date,q):
        self.reviewer = reviewer
        self.last = last
        self.number = number
        self.date = date
        self.hasComments = False
        self.comments= 0
        if q != None:
            self.questions = Questions(q)
            for i in range(1,len(q),2):
                if q[i] != '':
                    self.hasComments = True

class Question:
    def __init__(self,text,answer=None,comment = None):
        self.text = text
        if answer != None:
            self.answer = answer.replace("(please include a comment)","")
        self.comment = comment
        self.comments = []
        self.count = 0
        
class Questions:
    def __init__(self,q1=None):
        self.q=[]
        for i in range(0,len(question_text)-1):
            if (q1 == None):
                self.q.append(Question(question_text[i]))
            else:
                if len(q1) == 2*i+1:
                    q1.append('')
                self.q.append(Question(question_text[i],q1[2*i],q1[2*i+1]))

##        for x in question_text:
##            self.q.append(Question(x))
        self.total = 0

                               
class Comments:
    def __init__(self):
        self.q1 = 0
        self.q2 = 0
        self.q3 = 0
        self.q4 = 0
        self.q5 = 0
        self.q6 = 0
        self.q7 = 0
        self.q8 = 0
        self.q9 = 0
        self.q10 = 0
        self.total = 0

class Interesting:
    def __init__(self,reviewer,reviewee,number,date,comment):
        self.reviewer = reviewer
        self.reviewee = reviewee
        self.date = date
        self.number = number
        self.comment = comment


class Summary:
    def __init__(self):
        self.willingtodomore = 0
        self.chartsassigned = 0
        self.chartscompleted = 0
        self.timeperchart = 0
        self.comments = Comments()
        self.questions = Questions()
        self.docreviewingdoc = 0
        self.docreviewingdoccomments = 0
        self.docreviewingmid = 0
        self.docreviewingmidcomments = 0
        self.midreviewingmid = 0
        self.midreviewingmidcomments = 0
        self.midreviewingdoc = 0
        self.midreviewingdoccomments = 0
        self.totalcomments = 0
        self.totalcommentlength = 0
        self.commentlengths = []
        self.commentmeanlength = 0
        self.commentmedianlength = 0
        self.commentsperchart = 0

class App:
    def __init__(self,master):
        customFont = ("Helvetica",14)
        self.customFontSmall = ("Helvetica",12)
        self.frameStatus = Frame(master,width=300,highlightbackground="black", highlightthickness=1)
        self.frameStatus.grid(row=0,column=0,sticky = "NEWS")
        self.labelStatus1 = Label(self.frameStatus,text="Status",font=customFont,padx = 20)
        self.labelStatus1.grid(row=0,column=0,columnspan = 2)
        self.labelStatus = []
        self.labelStatusResult = []
        for i in range(0,16):
            self.labelStatus.append( Label(self.frameStatus,text = "test"+str(i),padx = 20))
            self.labelStatus[i].grid(row=i+1,column=0)
            self.labelStatusResult.append(Label(self.frameStatus,text = "True",padx = 20))
            self.labelStatusResult[i].grid(row=i+1,column = 1)
        k = 16
        self.labelStatusDate = []
        self.labelStatusDateResult = []
        for i in range(0,8):
            self.labelStatusDate.append(Label(self.frameStatus))
            self.labelStatusDate[i].grid(row = i+k,column = 0)
            self.labelStatusDateResult.append(Label(self.frameStatus))
            self.labelStatusDateResult[i].grid(row = i+k,column=1)
            
        #frame Overview
        self.frameOverview = Frame(master)
        self.frameOverview.grid(row=0,column=1,sticky="NEWS")

        t = ["Reset for new month",                 # 1 minute
             "Unlink form",                         # 1 minute
             "Delete responses",                    # 1 minute
             "Update month",                        # 1 minute
             "Update providers",                    # 1 minute
             "Update questions",                    # 6 minute
             "Update email text",                   #10 minute
             
             "Request charts from Drew",            # 1 minute
             "Save Drew's list to rawcharts.csv",   # 2 minute
             "Create charts to assign from rawcharts", # 1 minute
             "Assign charts to providers",          # 2 minute
             "Assign Heredia's charts to others",   # 5 minute
             "Send emails to providers",            # 3 minute
             "Send reminders",                      # 1 minute
             "Send single charts",                  # 5 minute

             "Save results data to results.csv",    # 2 minute 
             "Save survey data to survey.csv",      # 2 minute
             "Create summary",                      #15 minute
             "Send summary to Orlando",             # 2 minute
             "Update results email",                #15 minutes
             "Send results to providers"]           # 5 minute
        
        r = [1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,2,1,2,1,2,1]
        self.checkOverview = [0]*len(t)
        self.checkVar = [0]*(len(t))
        for i in range(0,len(t)):
                self.checkVar[i] = IntVar()


        self.setCheckOverviewStates()
        cRow = 0    
        for i in range(0,len(t)):
            cRow = cRow + r[i]
            self.checkOverview[i] = Checkbutton(self.frameOverview,text = t[i],variable = self.checkVar[i],command=self.saveOverview)
            self.checkOverview[i].grid(row = cRow,column=0,sticky="W",padx = 20)
            

        t = ["Set up","Assign","Collect Data","Summary","Results"]
        r = [0,8,17,20,23]
        self.labelOverview = [0]*len(t)
        for i in range(0,len(t)):
            self.labelOverview[i] = Label(self.frameOverview,text = t[i])
            self.labelOverview[i].grid(row=r[i],column=0,sticky="W",padx = 20)
            
        #frameSettings
        self.frameSettings = Frame(master)
        self.frameSettings.grid(row=0,column=1, sticky="NEWS")
        frameMonth = Frame(self.frameSettings,borderwidth=1,relief="solid",height = 100, width = 800)
        frameMonth.grid(row=0,column=1, sticky="NEWS")
        frameMonthButtons = Frame(self.frameSettings,borderwidth=1,relief ="solid",height =100)
        frameMonthButtons.grid(row=0,column=0)
        labelMonth = Label(frameMonth,text = "Month:  ",font=customFont)
        labelMonth.grid(row=0,column = 0)
        self.labelMonthCurrent = Label(frameMonth,text="",font=customFont)
        self.labelMonthCurrent.grid(row=0,column=1)
        self.textboxMonthCurrent = Entry(frameMonth,text = "February",font=customFont)
        self.textboxMonthCurrent.grid(row=0,column = 1)
        self.textboxMonthCurrent.grid_remove()
        buttonMonthEdit = Button(frameMonthButtons,text="Edit",command = self.editMonth)
        buttonMonthEdit.grid(row=0,column=2,sticky="W")
        buttonMonth = Button(frameMonthButtons,text="Save",command = self.setMonth)
        buttonMonth.grid(row=0,column=3,sticky="W")
        
        self.frameProviders = Frame(self.frameSettings,borderwidth=1,relief = "solid",height = 300, width = 300)
        self.frameProviders.grid(row=1,column=1, sticky="NEWS")
        self.frameProvidersButtons = Frame(self.frameSettings,borderwidth=1,relief="solid",height =300)
        self.frameProvidersButtons.grid(row=1,column=0)
        labelProviders = Label(self.frameProviders,text="First Name",justify="left",font=customFont)
        labelProviders.grid(row=0,column=0, sticky="NEWS")
        labelProviders = Label(self.frameProviders,text="Last Name",justify="left",font=customFont)
        labelProviders.grid(row=0,column=1, sticky="NEWS")
        labelProviders = Label(self.frameProviders,text="Email Address(es)",justify="left",font=customFont)
        labelProviders.grid(row=0,column=2, sticky="NEWS")
        labelProviders = Label(self.frameProviders,text="Job",justify="left",font=customFont)
        labelProviders.grid(row=0,column=3, sticky="NEWS")
        labelProviders = Label(self.frameProviders,text="Reviewee",justify="left",font=customFont)
        labelProviders.grid(row=0,column=4, sticky="NEWS")
        labelProviders = Label(self.frameProviders,text="Reviewer",justify="left",font=customFont)
        labelProviders.grid(row=0,column=5, sticky="NEWS")
        buttonProvidersEdit = Button(self.frameProvidersButtons,text="Edit",command=self.editProviders)
        buttonProvidersEdit.grid(row=0,column=0)
        buttonProvidersSave = Button(self.frameProvidersButtons,text="Save",command=self.setProviders)
        buttonProvidersSave.grid(row=0,column=1)

        frameQuestions = Frame(self.frameSettings,borderwidth=1,relief="solid",height = 300, width = 300)
        frameQuestions.grid(row=2,column=1, sticky="NEWS")
        frameQuestionsButtons = Frame(self.frameSettings,borderwidth=1,relief="solid",height=300)
        frameQuestionsButtons.grid(row=2,column=0)
        self.labelQuestions = Label(frameQuestions,text="Questions",justify="left",font=customFont)
        self.labelQuestions.grid(row=0,column=0)
        self.textboxQuestions = Text(frameQuestions,font=customFont,height = 10)
        self.textboxQuestions.grid(row=0,column=0)
        self.textboxQuestions.grid_remove()
        buttonQuestionsEdit = Button(frameQuestionsButtons,text="Edit",command = self.editQuestions)
        buttonQuestionsEdit.grid(row=0,column=2)
        buttonQuestionsSave = Button(frameQuestionsButtons,text="Save",command = self.setQuestions)
        buttonQuestionsSave.grid(row=0,column=3)

        #frameHelp
        self.frameHelp = Frame(master)
        self.frameHelp.grid(row=0,column=1,sticky="NEWS")

        #frameCreateFile
        self.frameCreateFile = Frame(master)
        self.frameCreateFile.grid(row=0,column=1,sticky="NEWS")
        self.textCreateFile  = Text(self.frameCreateFile,height = 40,width = 200)
        self.textCreateFile.grid(row=0,column=0)
        self.buttonCreateFile = Button(self.frameCreateFile,text="Create ", command = self.buttonCreateFileClick)
        self.buttonCreateFile.grid(row=1,column=0)
        
        #frameResults
        self.frameResults = Frame(master)
        self.frameResults.grid(row=0,column=1,sticky="NEWS")
        frame1 = Frame(self.frameResults,borderwidth = 1,relief = "solid")
        frame1.grid(row=0,column=0,sticky="nw",padx = 20,pady = 20)
        
        self.label0 = HTMLLabel(frame1,width=15)
        self.label0.grid(row=0,column = 0,sticky="new")
        self.label01 = HTMLLabel(frame1,width=15)
        self.label01.grid(row=0,column = 1,sticky="new")
        self.label02 = HTMLLabel(frame1,width=15)
        self.label02.grid(row=0,column=2,sticky="new")
        
        self.label1 = Label(self.frameResults,text="Label1",anchor="ne",justify="left")
        self.label1.grid(row=1,column = 0,sticky="nw",padx = 20,pady = 20)
        
        html = "<h3>Test</h3><h4>Test</h4>"
        self.my_label = HTMLLabel(self.frameResults,html=html,borderwidth = 1, relief="solid", height=40)
        self.my_label.grid(row=0,column=1,padx = 20,pady = 20,rowspan=4,sticky="ne")
        button1 = Button(self.frameResults,text="Send",width=30,command = self.button_sendemail)
        button1.grid(row = 4, column=0)
        button2 = Button(self.frameResults,text = "Don't Send", width=30,command = self.button_shownext)
        button2.grid(row=4,column=1)

        #frameOptional
        self.frameOptional = Frame(master)
        self.frameOptional.grid(row=0,column=1,sticky="NEWS")
        self.labelOptional1 = Label(self.frameOptional,text="Providers and Charts Completed")
        self.labelOptional1.grid(row=0,column=0)
        self.textOptional1 = Text(self.frameOptional)
        self.textOptional1.grid(row=1,column=0)
        self.labelOptional2 = Label(self.frameOptional,text="Number of Charts Owed to Providers")
        self.labelOptional2.grid(row=2,column=0)
        self.textOptional2 = Text(self.frameOptional)
        self.textOptional2.grid(row=3,column=0)
        
        
        #frameAssign
        self.frameAssign = Frame(master)
        self.frameAssign.grid(row=0,column=1,sticky="NEWS")
        self.frameByReviewee = Frame(self.frameAssign)
        self.frameByReviewee.grid(row=0,column=0)
        self.labelByReviewee = Label(self.frameByReviewee,text="By Reviewee")
        self.labelByReviewee.grid(row=0,column = 0)
        self.textByReviewee = Text(self.frameByReviewee)
        self.textByReviewee.grid(row=1,column=0)
        self.frameByReviewer = Frame(self.frameAssign)
        self.frameByReviewer.grid(row=0,column=1)
        self.labelByReviewer = Label(self.frameByReviewer,text="By Reviewer")
        self.labelByReviewer.grid(row=0,column = 0)
        self.textByReviewer = Text(self.frameByReviewer)
        self.textByReviewer.grid(row=1,column=0)

        #frameAssignSingle
        self.frameAssignSingle = Frame(master)
        self.frameAssignSingle.grid(row=0,column=1,sticky="NEWS",rowspan = 3)
        self.textAssignSingle = Text(self.frameAssignSingle,height=40,width=40)
        self.textAssignSingle.grid(row=0,column=0)
        with open(f_unassigned) as f:
            t = f.read()
            self.textAssignSingle.insert(0.0,t)
        self.entryAssignSingle = Entry(self.frameAssignSingle,width=100)
        self.entryAssignSingle.grid(row=0,column=1)
        self.buttonAssignSingle = Button(self.frameAssignSingle,text = "Submit",command = self.buttonAssignSingleClick)
        self.buttonAssignSingle.grid(row=1,column=1)
##        self.labelAssignSingle = Label(self.frameAssignSingle,text="hello")
##        self.labelAssignSingle.grid(row=2,column=1)
        
        
        #frameAssignEmail
        self.frameAssignEmail = Frame(master)
        self.frameAssignEmail.grid(row=0,column=1,sticky="NEWS")
        self.label4 = Label(self.frameAssignEmail,text="This is a test")
        self.label4.grid(row = 2,column = 0, sticky="NEWS")
        currentIndex = 0
        def button_shownextAssignEmail():
            global currentIndex
            try:
                currentIndex = next(i)
                j = currentIndex
                self.label4.config(text = "To: "+self.providers[j].email)
                self.labelAssignEmail.set_html(self.createAssignEmail(providers[j].first,providers[j].last,providers[j].email,providers[j].date,providers[j].number,providers[j].reviewee,providers[j].code))
            except:
                pass

        def button_sendAssignEmail():
            global currentIndex
            print(providers[currentIndex].last)
            pass
        self.labelAssignEmail = HTMLLabel(self.frameAssignEmail,html=html)
        self.labelAssignEmail.grid(row=3,column=0)
        buttonAssignEmailSend = Button(self.frameAssignEmail,text="Send",width=50,command = self.button_sendAssignEmail)
        buttonAssignEmailSend.grid(row = 4, column=0)
        buttonAssignEmailDontSend = Button(self.frameAssignEmail,text = "Don't Send", width=50,command = self.button_shownextAssignEmail)
        buttonAssignEmailDontSend.grid(row=4,column=1)

        #frame Repeat Email
        self.frameRepeat = Frame(master)
        self.frameRepeat.grid(row=0,column=1,sticky="NEWS")
        self.labelRepeat = Label(self.frameRepeat,text="The providers listed below have not completed any charts for this month.")
        self.labelRepeat.grid(row=0,column=0)
        self.textRepeat = Text(self.frameRepeat)
        self.textRepeat.grid(row=1,column=0)
        self.buttonRepeat = Button(self.frameRepeat,text = "Send Emails",command = self.emailRepeat)
        self.buttonRepeat.grid(row=2,column=0)
        
        #frame Summary
        self.frameSummary = Frame(master)
        self.frameSummary.grid(row=0,column=1,sticky="NEWS")
        buttonSummary = Button(self.frameSummary,text="Show Summary",command = self.showSummary)
        buttonSummary.grid(row=0,column=0)
        self.labelSummary1 = Label(self.frameSummary)
        self.labelSummary1.grid(row=1,column=0)
        self.labelSummary2 = Label(self.frameSummary)
        self.labelSummary2.grid(row=2,column=0)
        self.labelSummary3 = Label(self.frameSummary)
        self.labelSummary3.grid(row = 3,column=0)
        self.labelSummary4 = Label(self.frameSummary)
        self.labelSummary4.grid(row=4,column=0)

        #frame Reset
        self.frameReset=Frame(master)
        self.frameReset.grid(row=0,column=1,sticky="NEWS")
        buttonReset = Button(self.frameReset,text = "Reset everything for new month",command = self.resetAll)
        buttonReset.grid(row=0,column=0)
        
        #frame Fix
        self.frameFix = Frame(master)
        self.frameFix.grid(row=0,column=1,sticky="NEWS")
        with open(f_fix) as f:
            a = f.read()
            
        self.textFix = Text(self.frameFix,height = 30)
        self.textFix.insert(0.0,a)
        self.textFix.grid(row=0,column=0,sticky="NEW",padx = 20, pady = 20)
        self.textFix.bind("<KeyPress>",self.buttonFix_enable)
        self.buttonFix = Button(self.frameFix,text="Save",command = self.button_Fix,state = 'disabled')
        self.buttonFix.grid(row=1,column=0, pady=10, sticky="NS")
        #self.frameFix.rowconfigure(0,weight=1)
        
        #menu
        self.menubar = Menu(master)

        self.menubar.add_command(label="Overview",command=self.displayOverview)
        self.menubar.add_command(label="Reset",command=self.displayReset)
        createmenu = Menu(self.menubar,tearoff=0)
        self.menubar.add_cascade(label="Create Files",menu=createmenu)
        createmenu.add_command(label = "Create rawcharts.csv",command = self.createRaw)
        createmenu.add_command(label = "Create results.csv", command = self.createResults)
        createmenu.add_command(label = "Create survey.csv", command = self.createSurvey)
        assignmenu = Menu(self.menubar,tearoff=0)
        self.menubar.add_cascade(label="Assignment",menu=assignmenu)
        assignmenu.add_command(label="Generate Charts To Assign From Raw Data",command = self.generateFromRaw)
        assignmenu.add_command(label="Assign All",command = self.assignAll)
        assignmenu.add_command(label="Assign Single Chart",command = self.assignSingle)
        assignmenu.add_command(label="Show Assignments",command = self.showAssignments)
        assignmenu.add_command(label="Email Myself A Test Assignment",command = self.emailAssignmentToMyself)
        assignmenu.add_command(label="Email Assignments",command = self.emailAssignments)
        self.menubar.add_command(label="Repeat Email",command=self.displayRepeat)
        self.menuOptional = self.menubar.add_command(label="Optional",command = self.displayOptional)
        self.menuSummary = self.menubar.add_command(label="Summary",command = self.displaySummary, state = 'disabled')
        self.menuResults = self.menubar.add_command(label="Results",command = self.emailResults,state='disabled')


##        resultsmenu = Menu(menubar,tearoff=0)
##        resultsmenu.add_command(label="Email Results",command = self.emailResults)
##        menubar.add_cascade(label="Results",menu=resultsmenu)

##        summarymenu = Menu(menubar,tearoff=0)
##        menubar.add_cascade(label = "Summary",menu=summarymenu)
        self.menubar.add_command(label="Settings",command = self.displaySettings)
##        menubar.add_command(label="Help",command = self.displayHelp)
        self.menubar.add_command(label="Fix",command = self.displayFix)
##        settingsmenu = Menu(menubar, tearoff=0)
##        settingsmenu.add_command(label="Providers",command = self.setProviders)
##        settingsmenu.add_command(label="Month",command= self.setMonth)
##        settingsmenu.add_command(label="Filenames",command=self.setFilenames)
##        settingsmenu.add_command(label="Questions",command=self.setQuestions)
##        menubar.add_cascade(label="Settings",menu=settingsmenu)
        helpmenu = Menu(self.menubar,tearoff=0)
        helpmenu.add_command(label="Show Help File",command=self.displayHelp)
        helpmenu.add_command(label="Show List of Files",command=self.displayHelpFiles)
        self.menubar.add_cascade(label = "Help",menu=helpmenu)
        
        master.config(menu=self.menubar)
        
        self.loadAll()
        self.updateStatus()
##        self.frameStatus.tkraise()

#____________________________ Loading Subroutines __________________________________
    
    def loadAll(self):
       self.loadMonth()
       self.loadQuestions()
       self.loadProviders()
       self.loadTexts()
       #self.loadAssignments()
           

    def loadMonth(self):
        with open(f_month) as f:
            global month
            month = f.read()
            self.labelMonthCurrent.config(text=month)

    def loadQuestions(self):
        with open(f_questions) as f:
            global question_text
            question_text = []
            for x in f:
                question_text.append(x)
            a = ''
            for x in question_text:
                a = a + x
            self.labelQuestions.config(text = a)


    def loadProviders(self):                 
        self.providers = {}
        with open(f_providers,newline='') as f:
            a = csv.reader(f,delimiter=',',quotechar = '"')
            for x in a:
                if (len(x)>5):
                    self.providers[x[1]] = Provider(x)

        self.provider_entry = []
        i=0
        for p in self.providers:
            i+=1
            a1 = Entry(self.frameProviders,width=10,font=self.customFontSmall)
            a1.insert(0,self.providers[p].last)
            a1.grid(row = i,column = 0)
            a2 = Entry(self.frameProviders,width=10,font=self.customFontSmall)
            a2.insert(0,self.providers[p].first)
            a2.grid(row = i,column = 1)
            a3 = Entry(self.frameProviders,width = 60,font=self.customFontSmall)
            a3.insert(0,self.providers[p].email)
            a3.grid(row = i,column = 2)
            a4 = Entry(self.frameProviders, width = 10,font=self.customFontSmall)
            a4.insert(0,self.providers[p].job)
            a4.grid(row = i,column = 3)
            a5 = Entry(self.frameProviders, width = 10,font=self.customFontSmall)
            a5.insert(0,self.providers[p].isReviewee)
            a5.grid(row = i,column = 4)
            a6 = Entry(self.frameProviders, width = 10,font=self.customFontSmall)
            a6.insert(0,self.providers[p].isReviewer)
            a6.grid(row = i,column=5)
            self.provider_entry.append([a1,a2,a3,a4,a5,a6])

    def loadTexts(self):
        with open(f_generalteachingpoints) as f:
            text['general teaching points'] = f.read()
        

    def loadAssignments(self):
        #clear data each time so not duplicated
        for p in self.providers:
            self.providers[p].reviewee = []
            self.providers[p].date = []
            self.providers[p].number = []
            self.providers[p].charts = []
        
        with open(f_assigned) as f:
            for a in f:
                g = a.strip()
                if g != "":
                    b = g.split(',')
                    reviewer = b[0]
                    reviewee = b[1]
                    date = b[2]
                    number = b[3]
                    self.providers[reviewer].reviewee.append(reviewee)
                    self.providers[reviewer].date.append(date)
                    self.providers[reviewer].number.append(number)
                    self.providers[reviewee].charts.append(Chart(reviewer,None,number,date,None))


        
    def setCheckOverviewStates(self):
        i = -1
        try:
            with open(f_overview) as f:
                for line in f:
                    i =i + 1
                    self.checkVar[i].set(int(line))
        except:
            print("couldn't open ",f_overview)

            
    def saveOverview(self):
        with open(f_overview,"w") as f:
            for c in self.checkVar:
                f.write(str(c.get())+"\n")

    def editProviders(self):
        pass

    def setProviders(self):
        for i in range(0,len(self.providers)):
            p = self.provider_entry[i][1].get()
            self.providers[p].last = self.provider_entry[i][0].get()
            self.providers[p].first = self.provider_entry[i][1].get()
            self.providers[p].email = self.provider_entry[i][2].get()
            self.providers[p].job = self.provider_entry[i][3].get()
            self.providers[p].isReviewee = self.provider_entry[i][4].get()
            self.providers[p].isReviewer = self.provider_entry[i][5].get()
            
        with open(f_providers,"w") as f:
            csv_writer = csv.writer(f)
            for p in self.providers:
                csv_writer.writerow([self.providers[p].last,self.providers[p].first,self.providers[p].email,self.providers[p].job,self.providers[p].reviewee,self.providers[p].reviewer])
                
    def editMonth(self):
        self.textboxMonthCurrent.grid()
        self.textboxMonthCurrent.delete(0,'end')
        self.textboxMonthCurrent.insert(0,self.labelMonthCurrent.cget('text'))
        
    def setMonth(self):
        global month
        with open(f_month,'w') as f:
            f.write(self.textboxMonthCurrent.get())
        self.textboxMonthCurrent.grid_remove()
        self.labelMonthCurrent.config(text=self.textboxMonthCurrent.get())
        month = self.textboxMonthCurrent.get()

    def editQuestions(self):
        self.textboxQuestions.grid()
        self.textboxQuestions.delete(1.0,'end')
        self.textboxQuestions.insert(1.0,self.labelQuestions.cget('text'))
        
    def setQuestions(self):
        with open(f_questions,'w') as f:
            f.write(self.textboxQuestions.get(1.0,'end'))
        self.textboxQuestions.grid_remove()
        self.labelQuestions.config(text=self.textboxQuestions.get(1.0,'end'))
        
    def setFilenames(self):
        pass

# __________________________Create Files__________________________________________________
    def createRaw(self):
        self.frameCreateFile.tkraise()
        self.buttonCreateFile.config(text = "Create rawcharts.csv")
        self.buttonCreateFile.config(command = lambda: self.buttonCreateFileClick('rawcharts.csv'))

    def createResults(self):
        self.frameCreateFile.tkraise()
        self.buttonCreateFile.config(text = "Create results.csv")
        self.buttonCreateFile.config(command = lambda: self.buttonCreateFileClick('results.csv'))

    def createSurvey(self):
        self.frameCreateFile.tkraise()
        self.buttonCreateFile.config(text = "Create survey.csv")
        self.buttonCreateFile.config(command = lambda: self.buttonCreateFileClick('survey.csv'))

    def buttonCreateFileClick(self,f_name):
        t = self.textCreateFile.get(0.0,'end')
        with open(f_name,"w") as f:
            f.write(t.strip())


                

#__________________________ Assignment subroutines_____________________________________________ 
    def generateFromRaw(self):
        names = {}
        with open(f_fullnames) as f:
            for a in f:
                full,last = a.split(',')
                names[full] = last.strip()

        chart = {}
        t = ''
        with open(f_rawcharts) as f:
            for a in f:
                b = a.split('\t')
                if b[2] != 'ED Provider':
                    c = b[0].split(' ')
                    d = c[0].split('/')
                    date = d[0]+'-'+d[1]+'-'+d[2]
                    t = t + names[b[2]]+','+date+','+b[1]+'\n'

        with open(f_chartstoassign,'w') as f:
            f.write(t)

    def GetRevieweeDict(self):
        #reviewerList contains list of reviewees that key=reviewer will review
        #revieweeList contains list of reviewers that will review key=reviewee
        providerList = []
        chartsToReview = {}
        chartsToBeReviewed = {}
        reviewerDict = {}
        revieweeDict = {}
        reviewerList = []
        revieweeList = []
        for p in self.providers:
            revieweeDict[p] = []
            chartsToBeReviewed[p] = 5
            if self.providers[p].isReviewer == 'Y':
                providerList.append(p)
                chartsToReview[p] = 5
                reviewerDict[p] = []


        chartsToReview['Heredia'] = 25
        wList = ['Wasinger']*5
        sList = ['Scofield']*5
        fList = ['Fleming']*5
        bList = ['Bulloch']*5
        reviewerDict['Heredia'] = wList + sList + fList + bList  +['Ray','Dudley','Hauan','Maples','Oliver']
        reviewerDict['Scott'] = ['Ray','Dudley','Hauan','Maples','Oliver']
        shuffle(providerList)
            
        for p in providerList:
            for x in reviewerDict[p]:
                chartsToBeReviewed[x] -= 1
        
        for p in providerList:
            chartsToReview[p] -= len(reviewerDict[p])
            reviewerList = reviewerList + [p]*chartsToReview[p]
            revieweeList = revieweeList + [p]*chartsToBeReviewed[p]
        if (len(reviewerList)!= len(revieweeList)):
            print(f"reviewerList ({len(reviewerList)} and revieweeList ({len(revieweeList)})are not equal. (1)")
            
        
        i = 0 #revieweeList.index('Parks')  #adjust so that the largest set is first
        reviewee = ''
        shuffle(revieweeList)
        for x in reviewerList:
            if i > len(revieweeList)-1:
                i = 0

            inLoop = 0
            while revieweeList[i] in reviewerDict[x] or x == revieweeList[i]: #revieweeList[i] in reviewerDict[x] reviewee == revieweeList[i]
                i += 1
                if i > len(revieweeList)-1:
                    i = 0
                    inLoop += 1
                if inLoop > 15:
                    print('stuck in loop')
                    return({})
            reviewerDict[x] = reviewerDict[x] + [revieweeList[i]]
            reviewee = revieweeList[i]
            revieweeList.pop(i)

        for p in providerList:
            for x in reviewerDict[p]:
                revieweeDict[x] = revieweeDict[x] + [p]    

        return(revieweeDict)      

    def GetOptionalRevieweeDict(self):
        providerList = []
        chartsToReview = {}
        chartsToBeReviewed = {}
        reviewerDict = {}
        revieweeDict = {}
        reviewerList = []
        revieweeList = []
        for p in self.providers:
            revieweeDict[p] = []
            chartsToBeReviewed[p] = 3
            if self.providers[p].isReviewer == 'Y':
                providerList.append(p)
                chartsToReview[p] = 3
                reviewerDict[p] = []

        chartsToBeReviewed['Ray'] = 2
        chartsToBeReviewed['Maples'] = 2
        chartsToBeReviewed['Dudley'] = 2
        chartsToReview['Heredia'] = 0
        shuffle(providerList)

        for p in providerList:
            for x in reviewerDict[p]:
                chartsToBeReviewed[x] -= 1
        
        for p in providerList:
            chartsToReview[p] -= len(reviewerDict[p])
            reviewerList = reviewerList + [p]*chartsToReview[p]
            revieweeList = revieweeList + [p]*chartsToBeReviewed[p]
        if (len(reviewerList)!= len(revieweeList)):
            print(f"reviewerList ({len(reviewerList)} and revieweeList ({len(revieweeList)})are not equal. (2)")
            
        
        i = 0
        reviewee = ''
        shuffle(revieweeList)
        for x in reviewerList:
            if i > len(revieweeList)-1:
                i = 0

            inLoop = 0
            while revieweeList[i] in reviewerDict[x] or x == revieweeList[i]: #revieweeList[i] in reviewerDict[x] reviewee == revieweeList[i]
                i += 1
                if i > len(revieweeList)-1:
                    i = 0
                    inLoop += 1
                if inLoop > 15:
                    print('stuck in loop')
                    return({})
            reviewerDict[x] = reviewerDict[x] + [revieweeList[i]]
            reviewee = revieweeList[i]
            revieweeList.pop(i)

        for p in providerList:
            for x in reviewerDict[p]:
                revieweeDict[x] = revieweeDict[x] + [p]    

        return(revieweeDict)           
    
    def assignAll(self):
        #generate list of reviewers
        providerList = []
        probationList = ['Hauan','Oliver','Bard','Maples','Dudley','Scott']
        for p in self.providers:
            if self.providers[p].isReviewer == "Y":
                providerList.append(p)
        providerList.remove('Heredia')
        for p in probationList:
            providerList.remove(p)
        providerCount = len(providerList)

        #randomly sort reviewers
        d = [x for x in range(0,providerCount)]
        shuffle(d)

        #assigns 5 reviewers to each reviewer (because all non-reviewers are done by Orlando)
        reviewerDict = {}
        tim = 0
        while reviewerDict == {}:
            tim+=1
            print("running getReviewerDict",tim)
            reviewerDict = self.GetRevieweeDict()
            reviewerOptionalDict = self.GetOptionalRevieweeDict()
##            for key in reviewerDict.keys():
##                reviewerDict[key] = reviewerDict[key]+reviewerOptionalDict[key]

        #create list of assigned charts, any additional charts not assigned are written in f_unassigned        
        t = ""
        t1 = ""
        u = ""
        try:
            with open(f_chartstoassign) as f:
                for line in f:
                    last,date,number = line.split(',')
                    if last in reviewerDict:
                        if len(reviewerDict[last])>0:
                            t = t + reviewerDict[last][0]+","+last+","+date+","+number
                            reviewerDict[last].remove(reviewerDict[last][0])
                        else:
                            if len(reviewerOptionalDict[last])>0:
                                t1 = t1 + reviewerOptionalDict[last][0]+","+last+","+date+","+number
                                reviewerOptionalDict[last].remove(reviewerOptionalDict[last][0])
                            else:
                                u = u + last+","+date+","+number
                    else: #special for Heredia because he reviews residents and is not randomly assigned 
##                        herediaList = ['Scott','Oliver','Hauan','Monaghan','Parks']
                        if last in self.providers:
##                            if last == 'Heredia' and self.providers['Heredia'].theirchartsassignedtoothers < 5:
##                                print("heredia")
##                                t = t + herediaList[0]+","+last+","+date+","+number
##                                self.providers['Heredia'].theirchartsassignedtoothers +=1
##                                herediaList.pop(0)
##                            else:
                            if self.providers[last].isReviewer == "N":
                                print("in 5")
                                if self.providers[last].theirchartsassignedtoothers < 5:
                                    self.providers[last].theirchartsassignedtoothers += 1
                                    t = t + "Heredia,"+last+","+date+","+number
                                else:
                                    u = u + last + ","+date+","+number
                        else:
                            print(f'{last} is not a recognized provider')

        except:
            print('creating f_assigned and f_unassigned failed')

        t = t + t1
        
        with open(f_assigned,"w") as f:
            print('in write f_assigned')
            f.write(t)

        with open(f_unassigned,"w") as f:
            f.write(u)

        self.showAssignments()

    def assignSingle(self):
        self.frameAssignSingle.tkraise()

    def buttonAssignSingleClick(self):
        t = self.entryAssignSingle.get()
        a = t.split(',')
        m = "https://docs.google.com/forms/d/e/1FAIpQLSc3aMuJeAXq9dqaFEOqS6uQmL8tUQsyhlf2u2jKL8L5-GubHw/viewform"
        m = m + f"?usp=pp_url&entry.2030566466={a[0]}&entry.1056233046={a[1]}&entry.1414673315={a[3]}&entry.2019363790={a[2]}"""
        print(m)
        self.entryAssignSingle.delete(0,'end')
        self.entryAssignSingle.insert(0,m)
        

    def showAssignments(self):
        self.loadAssignments()
        t = ""
        for p in self.providers:
            t = t + f"{p} will review {len(self.providers[p].reviewee)}\n"
            for i in range(0,len(self.providers[p].reviewee)):
                t = t + f"{self.providers[p].reviewee[i]}\t{self.providers[p].date[i]}\t{self.providers[p].number[i]}\n"
            t = t + "\n"
        self.textByReviewer.delete(1.0,'end')
        self.textByReviewer.insert(0.0,t)

        t = ""
        for p in self.providers:
            t = t + f"{p} will be reviewed by {len(self.providers[p].charts)}\n"
            for c in self.providers[p].charts:
                t = t+ f"{c.reviewer},{c.date},{c.number}\n"
            t = t + "\n"
        self.textByReviewee.delete(1.0,'end')
        self.textByReviewee.insert(0.0,t)
        self.frameAssign.tkraise()

    def emailAssignments(self):
        self.loadAssignments()
        global provider_list
        currentProvider = ""
                                                                                                                                                  
        provider_list = iter(self.providers)

        self.button_shownextAssignEmail()
        self.frameAssignEmail.tkraise()

    def emailAssignmentToMyself(self):
        self.loadAssignments()
        p = self.providers['Scott']
        self.sendAssignEmail(p.first,p.last,p.email,p.date,p.number,p.reviewee,p.code)

    def button_shownextAssignEmail(self):
        global currentProvider
        global provider_list

        next_provider = next(provider_list,"EndOfList")
        print(next_provider)
        if next_provider == "EndOfList":
            provider_list = iter(self.providers)
            next_provider = next(provider_list)
        p = self.providers[next_provider]
        currentProvider = p

        self.label4.config(text = "To: "+p.email)
        self.labelAssignEmail.set_html(self.createAssignEmail(p.first,p.last,p.email,p.date,p.number,p.reviewee,p.code))

    def button_sendAssignEmail(self):
        global currentProvider
        p=currentProvider
        print(self.createAssignEmail(p.first,p.last,p.email,p.date,p.number,p.reviewee,p.code))
        self.sendAssignEmail(p.first,p.last,p.email,p.date,p.number,p.reviewee,p.code)
        self.button_shownextAssignEmail()

    def createAssignEmail(self,first,last,email,dates,number,reviewee,code):
        # message to be sent
        message = "<html><body>"
        message = message + f"{first},<br><br>"
        n = """Below you will find links to forms for reviewing charts you have been assigned this month.<br><br>
            <div style = "border: 1px solid black; padding: 20px; margin: 20px">
            <h3 style="text-align: center">Make Your Colleagues' Lives Easier</h3>
            <b>Please make your comments detailed enough so that the provider being reviewed does not have to look back at the
            chart to understand how they could improve.</b><br>
            Consider this example:<br><ul>
            Is there anything else that should be considered?<br>
            pregnancy</ul><br>

            <b>While, in general, it is always good to consider whether a patient might be pregnant, a much more helpful comment might look
            like this:<br></b><ul>
            Is there anything else that should be considered?<br>
            In a young woman who is vomiting, always make sure you get a pregnancy test</ul><br>
            <b>Although this takes a little longer to write, it is much quicker over all than opening and reading the chart to understand
            the context.</b><br><br>
            
            <u>Other pointers on doing a good chart review:</u><br><ul>
             <li>Comments should be written to help the person you are reviewing.</li>
             <li>Comments indicating the question doesn't apply are unnecessary.</li>
             <li>A few detailed comments are more helpful than many comments without useful details.</li>
             <li>Responses without comments are not helpful and not shared, so please leave comments.</li>
             <li>If you indicate that a case is interesting, please indicate why it would be beneficial to share with the group.</li>
            </ul></div>
            <div style = "border: 1px solid black; padding: 20px; margin: 20px">
            <h4>Unreviewable Charts</h4>
            During each chart review, there are usually a couple that are unreviewable.  Reasons that a chart might be unreviewable
            include:<ul>
            <li>It was a sign out and not actually done by the provider indicated</li>
            <li>It is confidential or restricted in some other way</li>
            <li>It doesn't exist - not completed, T-sheet due to downtime, etc</li>
            </ul>
            If an assigned chart is not reviewable, reply to this email or contact Steve Scott for a substitute.</div>
             
            Each individual link is prefilled with names, dates and visit numbers.<br>
            You can access these charts by copying the visit number from the Google form and pasting it into Meditech.  From home,
            you will need to paste using Ctrl+V. Here is the link to use Meditech at home: <a href='https://boone.meditech.cloud/live/' target='_blank'>Meditech</a><br>
            <br><br>"""
        message = message + n
        for i in range(0,len(number)):
            message = message + "<a href='https://docs.google.com/forms/d/e/1FAIpQLSc3aMuJeAXq9dqaFEOqS6uQmL8tUQsyhlf2u2jKL8L5-GubHw/viewform"
            message = message + "?usp=pp_url&entry.2030566466="+last+"&entry.1056233046="+reviewee[i]+"&entry.1414673315="+number[i]+"&entry.2019363790="+dates[i]+"'>Chart Review Form for "+reviewee[i]+"</a><br>"
            if i == 4:
                message = message + "<br><br><div style='border: 1px solid blue; padding: 20px'><h3 style = 'text-align: center'>New Feature This Month:  Optional Charts</h3>"
                message = message + f"The following charts are optional.  Some providers have requested that more of their charts be reviewed. "
                message = message + f"Therefore, if you complete these charts by {month} 10, an equal number of your "
                message = message + "charts will also be reviewed.  For instance, if you review 7 charts in total, you will have 7 of your charts "
                message = message + f"reviewed.  You will need to complete these charts by {month} 10, so there is time to ensure enough "
                message = message + "of your charts get reviewed.<br><br>"
            
    
##            Once you have completed all of your charts, please complete the brief survey below to provide feedback on the process.<br><br>
##
##            <a href='https://docs.google.com/forms/d/e/1FAIpQLSfT5knINcH_8ssooJpkWtDbcbyqWIA_XjYTsOJ49PIwdHM1zQ/viewform?
##            usp=pp_url&entry.107257274={last}&entry.162080650={str(code)}'><button>Survey</button></a><br><br>
        n = f"""</div><br>
            DO NOT ENTER ANY PROTECTED HEALTH INFORMATION INTO THESE FORMS<br>
            Ignore the statement on the form about signing in. You do not have to sign in.<br><br>

            Please complete this review by <b>{month} 15</b>. You will receive the results of the review of your charts shortly
            after that.<br><br>

            The results that are shared will be anonymized, so don't be afraid to say what needs to be said, but be nice.<br><br>


            Thank you for your service,<br><br>
            Orlando
            """
        message = message + n

        return(message)

    def sendAssignEmail(self,first,last,address,date,number,reviewee,code):
        # construct email
        email = EmailMessage()
        email['Subject'] = f'Charts to Review, due {month} 15'
        email['From'] = 'BHC ED Chart Review'
        email['To'] = address
        email.set_content(self.createAssignEmail(first,last,address,date,number,reviewee,code), subtype='html')

        s=smtplib.SMTP('smtp.gmail.com', 587)
        s.starttls()
        s.login('bhcedpeerreview@gmail.com', 'vdrheghdpqrlcgep')
        if (address != "test@gmail.com"):
            s.send_message(email)
            print("An email was sent to ",address)
        s.quit()


#___________________________Repeat email subroutines_______________________________________
    def displayRepeat(self):
        providersList = []
        for p in self.providers:
            if self.providers[p].isReviewer == "Y":
                providersList.append(p)
        
        with open(f_results,newline = '') as f:
            a = csv.reader(f,delimiter='\t',quotechar = '"')
            for x in a:
                try:
                    providersList.remove(x[1])
                except:
                    pass
        #providersList = ['Scott','Scott','Scott']
                
        t = ""
        for x in providersList:
            t = t + x + "\n"

        self.textRepeat.delete(0.0,'end')
        self.textRepeat.insert(0.0,t)
        self.frameRepeat.tkraise()

    def emailRepeat(self):
        self.loadAssignments()
        t = self.textRepeat.get(0.0,'end').strip()
        l = t.split('\n')
        print(l)
        for n in l:
            p = self.providers[n]
            self.sendRepeatAssignEmail(p.first,p.last,p.email,p.date,p.number,p.reviewee,p.code)
            
    def createRepeatAssignEmail(self,first,last,email,dates,number,reviewee,code):
        # message to be sent
        message = f"""<html><body><br><br><div style='border: 1px solid black; padding: 20px'><b>This is a reminder that the chart review is due by {month} 15.<br>
        The email below contains the same 5 assigned charts as the one sent at the beginning of this month, and has been provided so you don't have to search for the previous email.</b></div><br><br>"""
        message = message + f"{first},<br><br>"
        n = """Below you will find links to forms for reviewing charts you have been assigned this month.<br><br>
            <div style = "border: 1px solid black; padding: 20px; margin: 20px">
            <h3 style="text-align: center">Make Your Colleagues' Lives Easier</h3>
            <b>Please make your comments detailed enough so that the provider being reviewed does not have to look back at the
            chart to understand how they could improve.</b><br>
            Consider this example:<br><ul>
            Is there anything else that should be considered?<br>
            pregnancy</ul><br>

            <b>While, in general, it is always good to consider whether a patient might be pregnant, a much more helpful comment might look
            like this:<br></b><ul>
            Is there anything else that should be considered?<br>
            In a young woman who is vomiting, always make sure you get a pregnancy test</ul><br>
            <b>Although this takes a little longer to write, it is much quicker over all than opening and reading the chart to understand
            the context.</b><br><br>
            
            <u>Other pointers on doing a good chart review:</u><br><ul>
             <li>Comments should be written to help the person you are reviewing.</li>
             <li>Comments indicating the question doesn't apply are unnecessary.</li>
             <li>A few detailed comments are more helpful than many comments without useful details.</li>
             <li>Responses without comments are not helpful and not shared, so please leave comments.</li>
             <li>If you indicate that a case is interesting, please indicate why it would be beneficial to share with the group.</li>
            </ul></div>
            <div style = "border: 1px solid black; padding: 20px; margin: 20px">
            <h4>Unreviewable Charts</h4>
            During each chart review, there are usually a couple that are unreviewable.  Reasons that a chart might be unreviewable
            include:<ul>
            <li>It was a sign out and not actually done by the provider indicated</li>
            <li>It is confidential or restricted in some other way</li>
            <li>It doesn't exist - not completed, T-sheet due to downtime, etc</li>
            </ul>
            If an assigned chart is not reviewable, reply to this email or contact Steve Scott for a substitute.</div>
             
            Each individual link is prefilled with names, dates and visit numbers.<br>
            You can access these charts by copying the visit number from the Google form and pasting it into Meditech.  From home,
            you will need to paste using Ctrl+V. Here is the link to use Meditech at home: <a href='https://boone.meditech.cloud/live/' target='_blank'>Meditech</a><br>
            <br><br>"""
        message = message + n
        for i in range(0,4):
            message = message + "<a href='https://docs.google.com/forms/d/e/1FAIpQLSc3aMuJeAXq9dqaFEOqS6uQmL8tUQsyhlf2u2jKL8L5-GubHw/viewform"
            message = message + "?usp=pp_url&entry.2030566466="+last+"&entry.1056233046="+reviewee[i]+"&entry.1414673315="+number[i]+"&entry.2019363790="+dates[i]+"'>Chart Review Form for "+reviewee[i]+"</a><br>"
##            if i == 4:
##                message = message + "<br><br><div style='border: 1px solid blue; padding: 20px'><h3 style = 'text-align: center'>New Feature This Month:  Optional Charts</h3>"
##                message = message + f"The following charts are optional.  Some providers have requested that more of their charts be reviewed. "
##                message = message + f"Therefore, if you complete these charts by {month} 10, an equal number of your "
##                message = message + "charts will also be reviewed.  For instance, if you review 7 charts in total, you will have 7 of your charts "
##                message = message + f"reviewed.  You will need to complete these charts by {month} 10, so there is time to ensure enough "
##                message = message + "of your charts get reviewed.<br><br>"
            
        n = f"""</div><br>
            DO NOT ENTER ANY PROTECTED HEALTH INFORMATION INTO THESE FORMS<br>
            Ignore the statement on the form about signing in. You do not have to sign in.<br><br>

            Please complete this review by <b>{month} 15</b>. You will receive the results of the review of your charts shortly
            after that.<br><br>

            The results that are shared will be anonymized, so don't be afraid to say what needs to be said, but be nice.<br><br>


            Thank you for your service,<br><br>
            Orlando
            """
        message = message + n

        return(message)

    def sendRepeatAssignEmail(self,first,last,address,date,number,reviewee,code):
        # construct email
        email = EmailMessage()
        email['Subject'] = f'Reminder: Charts to Review, due {month} 15'
        email['From'] = 'BHC ED Chart Review'
        email['To'] = address
        email.set_content(self.createRepeatAssignEmail(first,last,address,date,number,reviewee,code), subtype='html')

        s=smtplib.SMTP('smtp.gmail.com', 587)
        s.starttls()
        s.login('bhcedpeerreview@gmail.com', 'vdrheghdpqrlcgep')
        if (address != "test@gmail.com"):
            s.send_message(email)
            print("An email was sent to ",address)
        s.quit()

        
                
            
#__________________________ Results subroutines _____________________________________________               
    
    def emailResults(self):
        global provider_list
        currentProvider = ""


        self.question_text = []
        with open(f_questions) as f:
            for a in f:
                self.question_text.append(a)
                                                                                                                                                  
        provider_list = iter(self.providers)

        self.button_shownext()
        self.frameResults.tkraise()

    def displaySettings(self):
        self.frameSettings.tkraise()
        
    def displayHelp(self):
        webbrowser.open(f_help)
        self.frameHelp.tkraise()

    def displayHelpFiles(self):
        t = "<html><head><style>table,th,td {border: 1px solid black; border-collapse: collapse; padding: 10px;}</style></head><body><table><tr><th>File Name</th><th>Contents</th><th>Used by</th><th>Generated by</th></tr>"
        t = t + f"<tr><td>{f_month}</td><td>current month</td><td>In emails</td><td>Changing month in Settings</td></tr>"
        t = t + f"<tr><td>{f_questions}</td><td>the text of the questions</td><td>Text of questions in summary and results emails</td><td>Changing questions in Settings</td></tr>"
        t = t + f"<tr><td>{f_providers}</td><td>data regarding providers</td><td>To determine assignments, generate emails</td><td>Changing data in Settings</td></tr>"
        t = t + f"<tr><td>{f_assigned}</td><td>charts assigned to each provider to review</td><td>Sending out emails with assignments</td><td>Automatically generated from chartstoassign.csv</td></tr>"
        t = t + f"<tr><td>{f_unassigned}</td><td>extra charts not assigned to any provider</td><td>Replacing bad charts</td><td>Automatically generated when charts are assigned</td></tr>"
        t = t + f"<tr><td>{f_results}</td><td>results of chart review</td><td>Compiling summary and sending results to providers</td><td>Saved from Google data</td></tr>"
        t = t + f"<tr><td>{f_resultssent}</td><td>list of providers and dates results were sent</td><td>Tracking which providers have been sent their results</td><td>Autmoatically generated when email is sent</td></tr>"
        t = t + f"<tr><td>{f_summary}</td><td>summary of all results</td><td>Send summary to Orlando</td><td>Generated by selecting Summary</td><</tr>"
        t = t + f"<tr><td>{f_help}</td><td>help file</td><td>Used to help understand the program</td><td>Not changed</td></tr>"
        t = t + f"<tr><td>{f_fix}</td><td>notes of bugs to fix</td><td>Displayed when Fix menu is selected</td><td>Not changed</td></tr>"
        t = t + f"<tr><td>{f_fullnames}</td><td>list of full names of providers and their corresponding last names</td><td>Converting raw data supplied by Drew to data for chartstoassign.csv</td><td>Not changed</td></tr>"
        t = t + f"<tr><td>{f_chartstoassign}</td><td>charts to be assigned</td><td>Data gleaned from Drew's raw data needed to assign charts</td><td>Automatically generated</td></tr>"
        t = t + f"<tr><td>{f_rawcharts}</td><td>charts to be assigned from Drew</td><td>Used to create chartstoassign.csv</td><td>file from Drew</td></tr>"
        t = t + f"<tr><td>{f_overview}</td><td>state of overview checkboxes</td><td>Used to keep track of current state of checkboxes</td><td>Automatically generated each time checkbox is changed</td></tr>"
        t = t + f"<tr><td>{f_helpfiles}</td><td>this file</td><td>Helps understand file structure</td><td>Automatically generated by program</td></tr>"
        t = t + "</table></body></html>"

        with open(f_helpfiles,'w') as f:
            f.write(t)
        webbrowser.open(f_helpfiles)
        self.frameHelp.tkraise()

    def displayOverview(self):
        self.frameOverview.tkraise()

    def showSummary(self):
        webbrowser.open(f_summary)
        pass

    def displaySummary(self):
        self.createSummary()
        self.frameSummary.tkraise()

    def displayOptional(self):
        self.createOptional()
        self.frameOptional.tkraise()

    def displayReset(self):
        self.frameReset.tkraise()

    def resetAll(self):
        if messagebox.askyesno("Confirm","Are you sure you want to reset everything to get ready for the next month?"):
            with open(f_overview,"w") as f:
                f.write("0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n")
            with open(f_resultssent,"w") as f:
                f.write("")
##            filelist = [f_assigned, f_unassigned, f_results, f_resultssent, f_summary, f_survey,  f_chartstoassign, f_rawcharts]
##            for f in filelist:
##                if os.path.exists(f):
##                    os.remove(f)
            self.setCheckOverviewStates()
        

    def displayFix(self):
        self.frameFix.tkraise()

    #displayFix subroutines
    def button_Fix(self):
        with open(f_fix,"w") as f:
            a = self.textFix.get(1.0,'end')
            f.write(a)
        self.buttonFix['state'] = 'disabled'

    #Fix subroutines
    def buttonFix_enable(self,e):
        self.buttonFix['state'] = 'normal'

    #displayResults subroutines
    def button_shownext(self):
        global currentProvider
        global provider_list

        next_provider = next(provider_list,"EndOfList")
        if next_provider == "EndOfList":
            provider_list = iter(self.providers)
            next_provider = next(provider_list)
        p = self.providers[next_provider]
        currentProvider = p
        t1 = ""
        t2 = ""
        t3 = ""
        i=0
        for q in self.providers:
            text = f"{len(self.providers[q].charts)}  {self.providers[q].last}<br>"
            if q == p.last:
                text = "<b>"+text+"</b>"
            if (i%3==0):
                t1 = t1 + text
            if (i%3==1):
                t2 = t2 + text
            if (i%3==2):
                t3 = t3 + text
            i +=1
        self.label0.set_html(t1)
        self.label01.set_html(t2)
        self.label02.set_html(t3)
        self.label1.config(text = "To: "+p.email)
        self.my_label.set_html(self.createemail(p.first,p.email,p.charts))

    def button_sendemail(self):
        global currentProvider
        p=currentProvider
        print(self.createemail(p.first,p.email,p.charts))
        self.sendmail(p.first,p.email,p.charts)
        self.button_shownext()

    def modify(self,t):
        x='“'
        y = '”'
        c = u'\u2019'
        c="’"
        t=t.replace(x,'"')
        t=t.replace(y,'"')
        t=t.replace(c,"'")
        t=t.replace(" (please include a comment)","")
        return(t)
    
    def comments(self,comment):
        if (comment == ""):
            text = "There were no comments for this question.<br><br>"
        else:
            t = comment
            if (t[0] == '\"'):
                t = t[1:]
            if (t[len(t)-1] == '"'):
                t = t[:-1]
            t = t.replace('\"\"','"')
            text = "Comments: <b>" + t +"</b><br><br>"
        return(text)

    def createemail(self,name,email,charts):
        # message to be sent
        message = "<html><body>"+name+",<br><br>"
        n = f"""The chart review for {month} is complete and the results are now available.  Below you will find a discussion of
        the most important and/or common issues that were brought up by the chart review for the group as a whole, followed by your
        specific results.<br><br>

        <h2>General Teaching Points</h2>

        
        <h2>Your Specific Results</h2>
        """
        message = message + n
        message = message + f"{len(charts)} of your charts were reviewed.  These are the comments that were provided.<br><br>"
        flag = False
        for i in range(0,len(charts)):
            if charts[i].hasComments == True:
                flag = True
                message = message + "Visit Number: <t>" + charts[i].number+"&nbsp;&nbsp;"
                message = message + "Date of Service: <t>"+ charts[i].date+"<br><br>"
                for q in charts[i].questions.q:
                    if (q.comment !=''):
                        message = message + q.text + " <b>"+q.answer+"</b><br>"
                        message = message + self.comments(q.comment)
        if flag == False:
            message = message + "No comments were provided on any of your charts."

        
##        l = len(charts)
##        for i in range(0,len(charts)):
##            message = message + "Chart Number: <t>" + str(i+1)+" of " + str(l)+"&nbsp;&nbsp;"
##            message = message + "Visit Number: <t>" + charts[i].number+"&nbsp;&nbsp;"
##            message = message + "Date of Service: <t>"+ charts[i].date+"<br><br>"
##            try:
##                for q in charts[i].questions.q:
##                    message = message + q.text + " <b>"+q.answer+"</b><br>"
##                    message = message + self.comments(q.comment)
##            except:
##                pass
                
            message = message + "<br><br><br>"
        message = message + "This email was automatically generated.  Please reply to this email if the data seems to be corrupted."     

        return(message)

    def sendmail(self,name,address,charts):
        # construct email
        email = EmailMessage()
        email['Subject'] = 'Chart Review Results for ' + month
        email['From'] = 'BHC ED Chart Review'
        email['To'] = address
        email.set_content(self.createemail(name,address,charts), subtype='html')

        s=smtplib.SMTP('smtp.gmail.com', 587)
        s.starttls()
        s.login('bhcedpeerreview@gmail.com', 'vdrheghdpqrlcgep')
        if (address != "test@gmail.com"):
            s.send_message(email)
            print("An email was sent to ",address)
            with open(f_resultssent,'a') as f:
                f.write(name+","+str(datetime.date.today()))
        s.quit()

#Optional subroutines
    def createOptional(self):
        t = ""
        for p in self.providers:
            if self.providers[p].chartscompleted > 0:
                t = t + f"{p}\t{self.providers[p].chartscompleted}\n"
        self.textOptional1.insert(0.0,t)
        t = ""
        for p in self.providers:
            if self.providers[p].chartscompleted > 5:
                t = t + f"{p}\t{self.providers[p].chartscompleted-5}\n"
        self.textOptional2.insert(0.0,t)    


#Summary subroutines
    def summarizecomments(self,s):
        message = "These are all of the comments for each reviewee.<br>"
        for p1 in s.providers:
            p = self.providers[p1]
            message = message + "<h3>"+ p.last+"</h3><br>"
            charts = p.charts
            if len(charts) > 0:
                message = message + f"{len(charts)} charts were reviewed by "
                n = charts[0].reviewer
                for i in range(1,len(charts)-1):
                    n = n + ", " + charts[i].reviewer
                if len(charts) > 1:
                    n = n + " & "+charts[len(charts)-1].reviewer
                message = message + n
            else:
                message = message + "No charts were reviewed for this provider"
                
            for i in range(0,len(charts)):
                if charts[i].hasComments == True:
                    message = message + "<br><br><u>Account Number: " + charts[i].number+"&nbsp;&nbsp;&nbsp;"
                    message = message + "Visit Date: " + charts[i].date+"&nbsp; &nbsp; &nbsp;Reviewed by: "+charts[i].reviewer+"</u><br>"
                    for q in charts[i].questions.q:
                        if (q.comment !=''):
                            message = message + q.text + " <b>"+q.answer+"</b><br>"
                            message = message + self.comments(q.comment)
                
         

        message = message + "<br><br><table><th>Provider</th><th>Number of their charts reviewed</th>"
        for p1 in s.providers:
            p = self.providers[p1]
            message = message + f"<tr><td>{p.last}</td><td>{len(p.charts)}</td></tr>"
        message = message + "</table>"
        return(message)
        

    def createsummaryemail(self,s):
        m = f"<html><head><title>Summary of Chart Reviews for {month}</title>"
        n = """
        <style>

                            .chart-wrapper {
                                    width: 900px;
                                    height: 300px;
                            }
                            
          .rad,
          .set {
            display: none;
            opacity: 1;
            width: 800px;
          }

          .set {
              width: 800px;
              }

          .rad:checked+.set {
            display: block;
            opacity: 1;
          }

          .btn {
            display: inline-block;
            text-align: center;
            border: 2px inset grey;
            border-radius: 6px;
            padding: 2px 3px;
            cursor: pointer;
            width: 220px;
          }

          .btn:hover {
            border-color: blue;
            color: blue;
            transition: .75s ease;
          }

          legend {
            font-size: 1.5em
          }
          table,td,th {
            border: 1px solid black;
            border-collapse: collapse;
            padding: 10px;
          }
          td,th {
            text-align: center;
          }
          
          .td1 {
            width: 15%;
            border: none;
          }
          .table1 {
            border: none;
          }
        </style>
        <script src='https://cdn.jsdelivr.net/npm/chart.js'></script>
      </head>"""
        m = m + n
        n = f"<body><div style='text-align: center'><h4>Chart Review Summary for {month}, 2023</h4></div>"
        m = m + n
        n = """<form id='main'>
          <table class="table1">
          <tr>
            <td class = "td1"><label for='rad0' class='btn'>Analysis & Recommendations</label></td>
            <td class = "td1"><label for='rad1' class='btn'>Burden of Work</label></td>
            <td class = "td1"><label for='rad2' class='btn'>Reviewers' Effort</label></td>
            <td class = "td1"><label for='rad3' class='btn'>Results of Review</label></td>
            </tr>
            <tr>
            <td class = "td1"><label for='rad4' class='btn'>Interesting Cases</label></td>
            <td class = "td1"><label for='rad6' class='btn'>Trends</label></td>
            <td class = "td1"><label for='rad5' class='btn'>Anomalies</label></td>
            </tr>
          </table>
    <br><br>
          <input id='rad0' class='rad' name='rad' type='radio'>

          <fieldset class='set'>
            <legend>Analysis & Recommendations</legend>"""
           ### <h3>Burden of Work</h3><ul>"""
        m = m + n
##        m = m + f"<li>The average time it took to complete charts was {s.avgtotaltime:.0f} minutes</li> "
        ###m = m + f"<li>{s.willingtodomore} people were willing to do more charts</li>"
        n = f"""</ul>
            <h3>Reviewers' Effort</h3><ul>
            <li>*** of 16 reviewers did not complete their charts</li>
            <li>Average was about {s.commentsperchart:.2f} comment on each chart</li>
            </ul>
            <h3>Results of Review</h3><ul>
            <li>See this section for details of comments made</li>
            <li>Unreviewable charts: 0</li>
            </ul>
            <h3>Trends</h3><ul>
            <li>Participation remains high</li>
            <li>Comments per chart remains consistent</li>
            <li>Length of comments (a surrogate for quality) is increasing</li>
            <li>However, the majority of the longer comments are from the two of us</li>
            <li>Charts are done steadily throughout the month</li><ul>
            </ul></ul>
            <h3>Anomalies</h3><ul>
            <li>Unreviewable charts: ***</li>
            <li>Providers not completing charts: ***</li>
            </ul>
            
            </ul>
            <h3>General Teaching Points To Share In Results Email</h3>
            <div style='border: 1px solid blue; margin: 20px; padding: 20px'>
            {text['general teaching points']}

                </div>
            <h3>Plans for next month</h3><ul>

            </ul>

            </ul>
            </ul>
            

            
          </fieldset>

          <input id='rad1' class='rad' name='rad' type='radio'>

          <fieldset class='set'>
            <legend>Burden of Work</legend>
            <table>"""
        m = m + n
        m = m + f"<tr><td>Charts Assigned</td><td>{str(s.chartsassigned)}</td></tr>"
        m = m + "<tr><td>Number Of Reviewers</td><td>" + str(s.reviewercount) + "</td></tr>"
        m = m + f"<tr><td>Charts Per Reviewer</td><td>{s.chartsperreviewer:.1f}</td></tr>"
  #      m = m + f"<tr><td>Average Total Time</td><td>{s.avgtotaltime:.0f} minutes</td></tr>"
  #      m = m + f"<tr><td>Average Time Per Chart</td><td>{s.timeperchart:.1f} minutes</td></tr>"
        n = """    </table>
          </fieldset>
          
                
          <input id='rad2' class='rad' name='rad' type='radio'>

          <fieldset class='set'>
            <legend>Reviewers' Effort</legend>
            <table>
              <tr><th>Name</th><th>Charts Completed</th><th>Charts Assigned</th><th>Percent Compeleted</th><th>Total Comments</th><th>Comments Per Chart</th></tr>"""
        m = m + n
        for p1 in s.providers:
            p=self.providers[p1]
            if p.isReviewer == "Y":
                m = m + f"<tr><td>{p.last}</td><td>{p.chartscompleted}</td><td>{p.chartsassigned}</td><td>{p.percentcompleted:.0%}</td><td>{p.comments.total}</td><td>{p.commentsperchart:.1f}</td></tr>"
        n = """    </table>
            <br><br>"""
        m = m + n
##            <h3>Average comments per chart based on professional category</h3>
##            <table>
##            <tr><th></th><th colspan = 2>Reviewee</th></tr>
##            <tr><th>Reviewer</th><th>Physician</th><th>Mid-level</th></tr>"""
##        m = m + n
##        m = m + f"<tr><th>Physician</th><td>{1.0*s.docreviewingdoccomments/s.docreviewingdoc:.1f}</td><td>{1.0*s.docreviewingmidcomments/s.docreviewingmid:.1f}</td></tr>"
##        m = m + f"<tr><th>Mid-level</th><td>{1.0*s.midreviewingdoccomments/s.midreviewingdoc:.1f}</td><td>{1.0*s.midreviewingmidcomments/s.midreviewingmid:.1f}</td></tr>"
##        n = """</table>
        n="""  <br><br><br>
            
            
          </fieldset>
                
          <input id='rad3' class='rad' name='rad' type='radio'>

          <fieldset class='set'>
            <legend>Results of Review</legend>"""
        m = m + n
        m = m + self.summarizecomments(s)
        n = """<br><br><table><tr><th>Question</th><th>Number of Comments</th></tr>"""
        m = m + n
        n = ''
        for q in s.questions.q:
            n = n + "<tr><td style='text-align: left'>"+q.text+"</td><td>"+str(q.count)+"</td></tr>"

        m = m + n

        n = ''
        for q in s.questions.q:
            if (q.text != "10. Is this an interesting case that should be shared with others?"):
                n = n + f"<h3>{q.text}</h3><ul>"
                for i in q.comments:
                    n = n + f"<li>{i}</li>"
                n = n + "</ul>"
        m = m + n + '<br>'        
        
            
        n =  """</table></fieldset>"""
        m = m + n
        m = m + self.writeTrends()
        
        n = """  <input id='rad4' class='rad' name='rad' type='radio'>

          <fieldset class='set'>
            <legend>Interesting Cases</legend>"""
        m = m + n
##        m = m + n + f"{s.reviewerscompletingsurvey} providers completed the survey."
##        
##            
##
##        n="""    <h3>Providers Wanting To Review More Charts In Exchange For Having More Of Their Charts Reviewed</h3>
##            <table>
##              <tr><th>Name</th><th>Number Extra</th></tr>"""
##        m = m + n
##        for p1 in s.providers:
##            p = self.providers[p1]
##            if (p.willingtodomore!='No' and p.willingtodomore != '0'):
##              m = m + f"<tr><td>{p.last}</td><td>{p.willingtodomore}</td></tr>"
##        m = m + "    </table><br><br><h3>Improvement Suggestions</h3><ul>"
##        for p1 in s.providers:
##            p = self.providers[p1]
##            if (p.improvementcomment != ""):
##                m = m +'<li>'+ p.improvementcomment+"</li>"
##
##        m = m + " </ul><br><br><h3>Suggested Questions</h3><ul>"
##        for p1 in s.providers:
##            p = self.providers[p1]
##            if (p.suggestedquestions != ""):
##                m = m +'<li>'+ p.suggestedquestions+"</li>"
##                
        
        n =  """</ul><br>    <h3>Interesting Cases</h3>
            <table>
            <tr><th>Provider</th><th>Number</th><th style="width: 80px">Date</th><th>Comment</th><th>Identified By</th></tr>"""
        m = m + n
        for c in s.interesting:
            m = m +"<tr><td>"+c.reviewee+"</td><td>"+c.number+"</td><td>"+c.date+"</td><td>"+c.comment+"</td><td>"+c.reviewer+"</tr>"
        n=  """    </table>
          </fieldset>"""
        m = m + n  
                
        n = """<input id='rad5' class='rad' name='rad' type='radio'>

          <fieldset class='set'>
            <legend>Anomalies</legend>
            <table>
              <tr><td>Harsh Or Inappropriate Comments</td><td>0</td></tr>
              <tr><td>Did Not Complete Most Of Assigned Charts</td><td>***</td></tr>
              <tr><td>Inconsistencies</td><td>0</td></tr>
              <tr><td>Problem charts</td><td>***</td></tr>
            </table>
            
          </fieldset>
          
        </form>
        <br><br>


    <script>
      const ctx = document.getElementById('myChart');
      const ctx1 = document.getElementById('reviewerEffort');
      const ctx2 = document.getElementById('reviewerComments');

      
      new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [1,2,3,4,5,6,7,8,9,10],
            datasets: [{"""

        m = m + n
        x = [0]*11
        for p1 in s.providers:
            p = self.providers[p1]
            x[p.ranking] += 1
                  
        n = f"data: [{x[1]},{x[2]},{x[3]},{x[4]},{x[5]},{x[6]},{x[7]},{x[8]},{x[9]},{x[10]}],"
        m = m + n
        n = """borderWidth: 1
          }]
        },
        options: {
            
          scales: {
            y: {
              beginAtZero: true,
                    title: {
                            text: 'Number of people',
                            display: true
                    }
            },
            x: {
                    title: {
                            text: 'Rating',
                            display: true
                    }
            }
    },
    plugins: {
                    
                            legend: {
                                    display: false
                                    }
                            
                    }
            }
        
      });

          new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: [0,1,2,3,4,5,6],
            datasets: [{"""
        m = m + n
        x = [0]*7
        for p1 in s.providers:
            p = self.providers[p1]
           # print(p.last)
           # print(int(p.commentsperchart))
            #x[int(p.commentsperchart)] += 1
            
        m = m + f"    data: [{x[0]},{x[1]},{x[2]},{x[3]},{x[4]},{x[5]},{x[6]}],"
        
        n="""    borderWidth: 1
          }]
        },
        options: {
            
          scales: {
            y: {
              beginAtZero: true,
                    title: {
                            text: 'Number of people',
                            display: true
                    }
            },
            x: {
                    title: {
                            text: 'Comments per chart',
                            display: true
                    }
            }
    },
    plugins: {
                    
                            legend: {
                                    display: false
                                    }
                            
                    }
            }
        
      });

      new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
          datasets: [{"""
        m = m + n
        x = [0]*21
##        for p1 in s.providers:
##            p = self.providers[p1]
##            x[p.chartsassigned] += 1

        m = m + f"data: [{x[0]},{x[1]},{x[2]},{x[3]},{x[4]},{x[5]},{x[6]},{x[7]},{x[8]},{x[9]},{x[10]},{x[11]},{x[12]},{x[13]},{x[14]},{x[15]},{x[16]},{x[17]},{x[18]},{x[19]},{x[20]}],"
        n = """    borderWidth: 1
          }]
        },
        options: {
            
          scales: {
            y: {
              beginAtZero: true,
                    title: {
                            text: 'Number of people',
                            display: true
                    }
            },
            x: {
                    title: {
                            text: 'Charts completed',
                            display: true
                    }
            }
    },
    plugins: {
                    
                            legend: {
                                    display: false
                                    }
                            
                    }
            }
        
      });
      
    </script>
      </body>
    </html>"""
        m = m + n
        return(m)

    def writeTrends(self):
        m = ""
        n =  """<input id='rad6' class='rad' name='rad' type='radio'>

          <fieldset class='set'>
            <legend>Trends</legend>"""
        m = m + n
        m = m + "<h3>Percent of people completing charts</h3>"
        m = m + """<div class='chart-wrapper'>
      <canvas id='myChart1'></canvas>
    </div>"""
        m = m + "<h3>Average comments per chart</h3>"
        m = m + """<div class='chart-wrapper'>
      <canvas id='myChart2'></canvas>
    </div>"""
        m = m + "<h3>Median length of comment</h3>"
        m = m + """<div class='chart-wrapper'>
      <canvas id='myChart3'></canvas>
    </div>"""

        m = m + "<h3>Mean length of comment</h3>"
        m = m + """<div class='chart-wrapper'>
      <canvas id='myChart4'></canvas>
    </div>"""
        
        m = m + "<h3>Cumulative completed reviews by day of month</h3>"
        m = m + """<div class='chart-wrapper'>
      <canvas id='myChart5'></canvas>
    </div>
        <h4>Specific interventions include:</h4>
        <ul>
        <li>5/31 - Initial email sent out</li>
        <li>6/11 - Reminder email sent out</li>
        </ul>"""
        m = m + "  </fieldset>"

        m = m + self.createChart('myChart1','ctx1',['March','April','May','June'],[94,94,94,0],'Month','Percent')
        m = m + self.createChart('myChart2','ctx2',['March','April','May','June'],[0.73,0.63,0.72,0],'Month','Comments per chart')
        m = m + self.createChart('myChart3','ctx3',['March','April','May','June'],[40,67,49,0],'Month','Letter count')
        m = m + self.createChart('myChart4','ctx4',['March','April','May','June'],[59,108,99,0],'Month','Letter count')
        m = m + self.createChart('myChart5','ctx5',['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'],[1,1,3,3,3,3,3,3,4,5,6,0,0,0,0],'Day of Month','Providers Done')

        

        return(m)

    def createChart(self,chartID,ctx1,labels,data,xlabel,ylabel):
        m = f"""    <script>
      const {ctx1} = document.getElementById('{chartID}');
      console.log(ctx1);
"""

      
        m = m + f"new Chart({ctx1},"
        m = m + "{type: 'bar',"
        m = m + "data: {"
        m = m + "labels: ['"
        n = labels[0]+"'"
        for k in range(1,len(labels)):
            n = n + ',"'+labels[k]+'"'
        m = m +n+ "],"
        m = m + "    datasets: [{"
        
        n = "data: ["+str(data[0])
        for k in range(1,len(data)):
            n = n + ','+str(data[k])
        m = m + n + ']'
        n = """,borderWidth: 1
          }]
        },
        options: {
            
          scales: {
            y: {
              beginAtZero: true,
                    title: {"""
        m = m + n
        n = f"text: '{ylabel}',"
        m = m + n
        n = """ display: true
                    }
            },
            x: {
                    title: {"""
        m = m + n
        n = f"text: '{xlabel}',"
        m = m + n
        n = """display: true
                    }
            }
    },
    plugins: {
                    
                            legend: {
                                    display: false
                                    }
                            
                    }
            }
        
      });
      </script>
      """
        m = m + n
        return(m)
    
    def createSummary(self):
        summary = Summary()
        interesting = []

        summary.reviewercount = 0
        for p in self.providers:
            self.providers[p].charts = []
            if self.providers[p].isReviewer == "Y":
                summary.reviewercount +=1

        with open(f_results,newline = '') as f:
            a = csv.reader(f,delimiter='\t',quotechar = '"')
            for x in a:
                reviewer = x[1]
                reviewee = x[2]
                #print(x[1],x[2])
                number = x[3]
                date = x[4]
                q = x[5:]
                if (x[0] != "Timestamp"):
                    summary.chartscompleted +=1
                    self.providers[reviewee].charts.append(Chart(reviewer, reviewee, number, date, q))
                    z = self.providers[reviewee].charts[-1:][0]
                    self.providers[reviewer].chartscompleted += 1
                    if (q[17] == "Yes"):
                        interesting.append(Interesting(reviewer,reviewee,number,date,q[18]))
                    if (q[1] != ""): #test
                        self.providers[reviewer].comments.q1 += 1
                        summary.questions.q[0].comments.append(q[1])
                        summary.questions.q[0].count += 1
                        summary.questions.total += 1
                        z.comments +=1
                        self.providers[reviewer].comments.total +=1
                    if (q[3] != ""):
                        self.providers[reviewer].comments.q2 += 1
                        summary.questions.q[1].comments.append(q[3])
                        summary.questions.q[1].count += 1
                        summary.questions.total += 1
                        z.comments +=1
                        self.providers[reviewer].comments.total +=1
                    if (q[5] != ""):
                        self.providers[reviewer].comments.q3 += 1
                        summary.questions.q[2].comments.append(q[5])
                        summary.questions.q[2].count += 1
                        summary.questions.total += 1
                        z.comments +=1
                        self.providers[reviewer].comments.total +=1
                    if (q[7] != ""):
                        self.providers[reviewer].comments.q4 += 1
                        summary.questions.q[3].comments.append(q[7])
                        summary.questions.q[3].count += 1
                        summary.questions.total += 1
                        z.comments +=1
                        self.providers[reviewer].comments.total +=1
                    if (q[9] != ""):
                        self.providers[reviewer].comments.q5 += 1
                        summary.questions.q[4].comments.append(q[9])
                        summary.questions.q[4].count += 1
                        summary.questions.total += 1
                        z.comments +=1
                        self.providers[reviewer].comments.total +=1
                    if (q[11] != ""):
                        self.providers[reviewer].comments.q6 += 1
                        summary.questions.q[5].comments.append(q[11])
                        summary.questions.q[5].count += 1
                        summary.questions.total += 1
                        self.providers[reviewer].comments.total +=1
                    if (q[13] != ""):
                        self.providers[reviewer].comments.q7 += 1
                        summary.questions.q[6].comments.append(q[13])
                        summary.questions.q[6].count += 1
                        summary.questions.total += 1
                        z.comments +=1
                        self.providers[reviewer].comments.total +=1
                    if (q[15] != ""):
                        self.providers[reviewer].comments.q8 += 1
                        summary.questions.q[7].comments.append(q[15])
                        summary.questions.q[7].count += 1
                        summary.questions.total += 1
                        z.comments +=1
                        self.providers[reviewer].comments.total +=1
                    if (q[17] != ""):
                        self.providers[reviewer].comments.q9 += 1
                        summary.questions.q[8].comments.append(q[17])
                        summary.questions.q[8].count += 1
                        summary.questions.total += 1
                        z.comments +=1
                        self.providers[reviewer].comments.total +=1
                    if (q[18] == "Yes (please include a comment)"): #interesting case
                        if (len(q)>19):
                            interesting.append(Interesting(reviewer,reviewee,number,date,q[19]))
                        else:
                            interesting.append(Interesting(reviewer,reviewee,number,date,""))
                    for comment in [q[1],q[3],q[5],q[7],q[9],q[11],q[13],q[15],q[17]]:
                        if comment != '':
                            summary.totalcomments +=1
                            summary.totalcommentlength += len(comment)
                            summary.commentlengths.append(len(comment))
        with open(f_assigned) as f:
            for a in f:
                g = a.strip()
                h = g.split(',')
                if (len(h)>1):
##                    h[0] = reviewer
##                    h[1] = reviewee
##                    h[2] = date
##                    h[3] = number
                    reviewer = h[0]
                    reviewee = h[1]
                    date = h[2]
                    number = h[3]
                    self.providers[reviewer].reviewee.append(reviewee)
                    self.providers[reviewer].date.append(date)
                    self.providers[reviewer].number.append(number)
                    self.providers[reviewer].chartsassigned += 1
                    summary.chartsassigned +=1

        try:
            with open(f_survey,newline = '') as f:

                a = csv.reader(f,delimiter=',',quotechar = '"')
                summary.reviewerscompletingsurvey = 0 #initialize
                for x in a:
                #x0 = timestamp
                #x1 = code
                #x2 = reviewer
                #x3 = suggestions
                #x4 = questions
                #x5 = would do additional charts
                #x6 = additionalcharts
                    if (x[0] != "Timestamp"):
                        summary.reviewerscompletingsurvey += 1
                        reviewer = x[2]
                        self.providers[reviewer].improvementcomment = x[4]
                        self.providers[reviewer].suggestedquestions = x[5]
                        self.providers[reviewer].willingtodomore = x[6]

        except:
            pass

        for p in self.providers:
            if (self.providers[p].chartsassigned > 0):
                self.providers[p].percentcompleted = 1.0*self.providers[p].chartscompleted/self.providers[p].chartsassigned
            else:
                self.providers[p].percentcompleted = 0
            if (self.providers[p].chartscompleted > 0):
                self.providers[p].commentsperchart = 1.0*self.providers[p].comments.total/self.providers[p].chartscompleted
            else:
                self.providers[p].commentsperchart = 0
            
            if (self.providers[p].willingtodomore!='No' and self.providers[p].willingtodomore != '0'):
                summary.willingtodomore +=1
                
          
        summary.chartsperreviewer = 1.0*summary.chartsassigned/summary.reviewercount
        summary.providers = self.providers
        summary.interesting = interesting
        summary.commentmeanlength = summary.totalcommentlength/summary.totalcomments
        summary.commentmedianlength = median(summary.commentlengths)
        summary.commentsperchart= summary.totalcomments/summary.chartscompleted
        
        self.labelSummary1.config(text=f"Total comments = {summary.totalcomments}")
        self.labelSummary2.config(text = f"Mean Length of comments = {summary.commentmeanlength}")
        self.labelSummary3.config(text = f"Median Length of Comments = {summary.commentmedianlength}")
        self.labelSummary4.config(text = f"Comments Per Chart = {summary.commentsperchart:.2f}")

        print(self.createsummaryemail(summary))
        with open(f_summary,'w') as f:
            f.write(self.createsummaryemail(summary))
        self.updateStatus()

        
#******************** Status *********************
    def updateStatus(self):
        filelist = [f_month,f_questions,f_providers,f_help, f_helpfiles, f_fix, f_fullnames, f_overview, f_assigned, f_unassigned, f_results, f_resultssent, f_summary, f_survey,  f_chartstoassign, f_rawcharts]
        for i in range(0,len(filelist)):
            self.labelStatus[i].config(text=filelist[i])#[0:filelist[i].find('.')])
            if os.path.isfile(filelist[i]):
                self.labelStatusResult[i].config(text="Exists",fg = "green")
            else:
                self.labelStatusResult[i].config(text="Does Not Exist",fg = "red")

        createdlist = [f_rawcharts, f_chartstoassign, f_assigned, f_unassigned, f_results, f_resultssent, f_summary, f_survey]
        for i in range(0,len(createdlist)):
            if os.path.isfile(createdlist[i]):
                self.labelStatusDate[i].config(text=createdlist[i])
                self.labelStatusDateResult[i].config(text = datetime.utcfromtimestamp(os.path.getmtime(createdlist[i])).strftime('%m-%d'))
        print('outside')
        if os.path.isfile(f_results):
            print('inside')
            self.menubar.entryconfig('Summary',state='normal')
            self.menubar.entryconfig('Results',state='normal')
            print('leaving')
            
root = Tk()
root.geometry('1800x900')
#root.protocol("WM_DELETE_WINDOW",on_closing)
root.wm_title("Chart Review")
app = App(root)
root.mainloop()
