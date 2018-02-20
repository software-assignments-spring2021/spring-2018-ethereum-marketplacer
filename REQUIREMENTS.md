# Project Requirements

## End-user observation
<br />
**Persona 1**

Name: Nur al-Jimenez

Location: Massachusetts Institute of Technology, Massachusetts, USA

Occupation: Computer Science Student

Age: 22 years old

Gender: Male

I am a computer science student at MIT working on a new app idea in which we use machine learning to recommend quiet study spots on campus. I need to help with implementing a mathematical algorithm for our program, however, online Q&A platforms like Chegg require me to pay into the platform, and forums like Stack Overflow will point me in the right direction as opposed to actually solving my problem for me. I do not have the time to figure out the work for myself, and need to pay someone to implement the algorithm for me in Java, while I work on the front-end aspects of my app.


I need a platform where there is incentive for competition among people who answer my question so that I can guarantee the answers I am getting are of high quality. Time is also an important issue, so the ability to have a time limit on my bounty is important, and I would like an escrow system in order to protect my funds from scammers. I need to be able to deny and accept answers, and would like the ability to see a small preview of the answers before I choose to escrow some of my funds. Also important is an ability to allow any answers I accept to be made public, thus encouraging people with better answers to offer their solutions instead. A reputation system would also be nice, thus, before I escrow some of my funds I know whether or not the user is somebody I can trust.


As I am using a decentralized platform, I do have a degree of technical competency. After all, it is not exactly a straightforward process to access DApps through a common browser and syncing to the Ethereum network. However, a straight forward user interface which makes it simple to link to my Ethereum wallet is crucial to the appeal of this platform. Another reason I am choosing to use a decentralized Q&A network is it protects my sensitive information and my data, essentially allowing me to place bounties on problems I need help with safely and securely.



<br />
**Persona 2**

Name: Nikita Chao

Location: Hyderabad, India

Occupation: Math teacher/Freelance Coder

Age: 26 Years Old

Gender: Male

I am a math teacher in India who also enjoys coding. As a way to make money on the side, I like to answer American college students’ questions for money. On platforms such as Chegg and Quora, I only get set fees determined by a third party, as opposed to getting a full bounty for my work. Hence, I would like a decentralized Q&A platform, to cut out a middle man and ensure I deal directly with the party asking the question. Another issue is that Chegg and Quora require third party approval before you can begin answering questions, thus blocking out people such as myself who are self-taught experts in certain subjects.  


For this platform I need the ability to know that the user will not just screenshot my answers and then decline my request for his funds, thus I need a method of guaranteeing payment. Therefore, an escrow system is crucial for me participating in this platform, as it means that I will receive payment for my work. I would also like a reputation system so that as I become a more active member of the community I become more trusted and thus it is easier for my answers to be selected first and I am first to be escrowed the funds. 


As someone who is working from outside of the US, it is also very important for me to be able to have an easy way to transact value globally with one standard agreed currency, with minimal transaction fees. This is why I need a platform built on Ethereum, as Ethereum can be sent around the world with little transaction fees and has a global, agreed upon, value. Also, having a decentralized platform allows me to protect my data and personal information. A simple and efficient front-end is also crucial, so I can spend more time answering questions rather than navigating the website, thus saving time, and making more money. 



<br />

## Use Cases
<br />
**Use Case 1**
<br />
Title: Post Question <br />
Actor: Asker <br />

Scenario: 
1. Asker enters platform
2. Asker creates question posting, includes:
    - Descriptive Title
    - Text Description
    - File Upload (Optional)
    - Subject-Tag
    - Time constraint (Optional)
    - Bounty (Optional)
        - If true, asker sends amount to a staked address
3. Asker posts posting
4. Asker is notified when receives potential answer (blurred portion)
5. Asker reviews submission
    - If accepts, bounty is released from staked address to Answerer’s address and response is posted publicly to thread
   	- If declines, Answerer’s response is discarded
    - Either way, asker will be directed to leave a review with a 1-5 star rating system and a 140 character comment
6. If time constraint reached and no accepted responses, bounty is released back to Asker’s wallet

<br/>
<br/>
<br/>
**Use Case 2**
<br/>
Title: Browse Questions <br />
Actor: Browser

Scenario:
1. Browser enters platform
2. Browser views posts of questions in a forum-style layout (similar to reddit)
3. Browser has options to browse by specific categories: by Subject-tags, by bounty-only
4. Browser can sort postings by highest bounty, highest time priority, most recent, most discussed
5. Browser then can click on specific postings to look at answers if any
6. Browser then can choose to submit an answer, where he then becomes an Answerer actor

<br />
<br />
<br />
**Use Case 3**
<br />
Title: Answer Question <br />
Actor: Answerer

Scenario: 
1. User clicks reply/submit answer
2. Browser actor becomes answerer when user decides to reply to a question
3. User is directed to submit_response page, includes:
    - Quote of question the answerer is responding to
    - Text box for response
    - File Upload for response
    - Address for bounty to be transferred to
4. Then user submits response and waits for asker to accept or decline, then when notified: 
    - If accepts, bounty is released from staked address to Answerer’s address provided above
    - If declines, then Answerer has option to revise his answer and submit again


<br />
<br />
<br />
**Post Question UML**
<br />

![image](https://github.com/nyu-software-engineering/ethereum-marketplacer/blob/Nikita_Branch/image/Use%20Case%20%231.jpg?raw=true)

<br />
<br />
<br />
**Answer Question UML**
<br />
![image](https://github.com/nyu-software-engineering/ethereum-marketplacer/blob/Nikita_Branch/image/answerer_use_case.jpg?raw=true)

<br />
<br />
<br />
**Domain Model UML**
<br />
![image](https://github.com/nyu-software-engineering/ethereum-marketplacer/blob/Nikita_Branch/image/Domain.jpg?raw=true)

