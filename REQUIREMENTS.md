##Initial Project Requirements

####Use Cases####
<br />
##Use Case 1##
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

 
 <br /> <br /> <br />
 ##Use Case 2##
Title: Browse Questions <br />
Actor: Browser

Scenario:
1. Browser enters platform
2. Browser views posts of questions in a forum-style layout (similar to reddit)
3. Browser has options to browse by specific categories: by Subject-tags, by bounty-only
4. Browser can sort postings by highest bounty, highest time priority, most recent, most discussed
5. Browser then can click on specific postings to look at answers if any
6. Browser then can choose to submit an answer, where he then becomes an Answerer actor

 
 <br /> <br /> <br />
##Use Case 3##
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


