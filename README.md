# ethereum-QA

# 1. Initial project proposal

Decentralized Question Answerer
I am proposing a decentralized question-and-answer platform built on the Ethereum Blockchain.

This platform would allow users to post individual questions or problems with a "bounty" attached. The bounty would be an amount of ether a user would be willing to pay for the question to be answered. Then another individual would provide an answer and receive the bounty. 

In traditional applications (Chegg, CourseHero), users usually must subscribe to a monthly fee in order to access the answers to problem sets and textbooks. This platform would allow individuals to set a price they are willing to pay for a specific question to be answered and offer an incentive for others to answer the question. Additionally, as this platform would be decentralized, all the personal data of the user would not be 'owned' by a third-party, rather it would be stored on the Ethereum Blockchain.

I believe this platform would be popular among college students. In my experience, it is extremely common for students to seek out and pay for resources such as textbook solutions, answers to problem sets, or even specific problems from their courses. I think specifically, this platform could aid in time-sensitive situation; for instance "I have one last really hard Calc problem that I can't figure out due tomorrow morning, I'm literally willing to pay someone $20 for the answer." Then they post the question on the platform with a 12-hour expiration period and hope that someone will answer it. 

From an end-user's perspective, he will enter this website after he has connected to the Ethereum network. The main page will display the most time-sensitive/highest bounty questions. Or he can choose specific categories/sub-categories: Finance, Science, Math.... --> Calculus, Discrete Mathematics, Algebra..., where he can browse posted questions in each category. Once he chooses a question, he can submit an answer and if his answer is Accepted by the poster, he will receive the bounty, where the amount will be sent directly to his synced Ethereum wallet.

As a user posting questions, he can create a new post, select the category, then post text/pdf/picture of his question and attach a bounty and a time-limit to his question. He will be notified if he receives an answer, and he may either Accept or Reject it.

There are two possible issues with this project:
1) As a professor, these types of platform could be seen as extremely academically disingenuous. But I want to do this project as more of a proof-of-concept and to gain exposure for programming in Solidity and working in the Ethereum environment. 

2) If you do allow this idea, I still have not addressed a huge potential problem of this platform: ensuring quality in the answers. 

To walk through an example: 
Questioner asks "What is 2+2? I'm willing to pay 1 ETH for the answer".

What is stopping the answerer from posting "5" and running off with the payout?
This solution is fairly simple. The Questioner has an allocated time to review the answer. If he Accepts, the bounty will be released (best-case scenario). If he Rejects, the answer is discarded. If he does nothing and the allocated time ends, the bounty is released.

But this leads to the problem: What's stopping the Questioner from simply reviewing the answer, copying it down, and then rejecting it, keeping the bounty for himself?

I haven't quite figured this part out. I was thinking about some sort of a reputation system, but then that adds a whole layer of complexity to the platform. Another possible solution would be to disclaim to users that placing a bounty may not ensure an answer of the highest quality, which I believe could be fair seeing as the user is paying on his own accord. This would eliminate the problem discussed above. 

This brings me to discuss the scope of the project. I understand the project might seem quite ambitious, as we would be developing a full question-and-answer platform on top the Ethereum network, an extremely new technology as it is. I think with the most primitive implementation of the platform: allowing users to post a question and attach a bounty to it, and then transferring the amount to the answerer, would be fairly doable yet still present a challenging task. We would have to build out the whole front-end of the application and have the back-end (transferring of value) run on smart contracts built in Solidity. 

Nikita Mokhov and I are extremely interested in blockchain technology and would really love to work on a Solidity project this semester. I think we're approaching an era where having hands-on experience developing blockchain technologies will be extremely valuable and we would love to utilize this course's framework as an opportunity to work on these types of projects. If this idea does not seem completely feasible, we would love to discuss other potential projects build around Solidity with you. Thank you so much for your time.


# 2. At first, the team was assigned to work on an Ethereum-based decentralized marketplace. The team then decided that the Q/A platform would be a fun project to work on as it is very similar to the marketplace but has not really been done by other organizations (the marketplace is in development in many cryptocurrencies, i.e. PIRL). Professor Bloomberg has also expressed he likes the idea behind the QA platform more than the marketplace platform.

Whoever proposed the idea, feel free to edit this file to reflect how you came up with it.


# 3. We will follow the branching workflow - as suggested by Professor Bloomberg. If you want to contribute to the project, please see CONTRIBUTING.md.


# 4. Important links:

- https://github.com/nyu-software-engineering/ethereum-marketplacer/blob/master/CONTRIBUTING.md
- https://github.com/nyu-software-engineering/ethereum-marketplacer/blob/master/REQUIREMENTS.md


# 5. Additional info:

This project is being visualized and built by four New York University students for the course Software Engineering taught by Professor Amos Bloomberg. Thus the project is closed to outside contributors... for now.









