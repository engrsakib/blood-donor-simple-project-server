# BloodBridge

A comprehensive platform designed for community welfare and fundraising, enabling users to create, manage, and participate in donation campaigns. This project also facilitates lost and found item management, allowing users to post, browse, and recover lost belongings effectively.

User Roles and Permissions
2.1 Role Management
Admin 🌐: Has access to all features, including user management, donation requests, and content management.
Donor🩸: Can register, view donation requests, and respond to them, maintain his own profile.
Volunteer 🤝: Can create and manage donation request.
💡 Make a user admin by editing from database
3. User Authentication(public)
3.1 Registration
The application will have a registration page from where users can register an account for himself. When a new user will register an account by default the role of the user will be “donor”. [ Do not enforce the email verification method and forget & reset password method, as it will inconvenience the examiner. If you want, you can add it after receiving the assignment result. ] Registration form will have the following input fields


email
name
avatar(use imageBB to upload the user avatar)
blood group(a selector with option A+, A-, B+, B-, AB+, AB-, O+, O-)
district(select option)
upazila(select option)
password
confirm_password
💡 status: Every user will have a default status “active”. Admin can block a user. Then the status for the user will be “blocked”. We will talk more about this feature in admin section



 💡 You will find data for district and upazila in the resources section & social login is not required. You do not need to implement any social login.


3.2 Login
Application will have a login page from where registered users can log in using their email and password. Users can navigate to the registration page from the login page and vise versa
4. Dashboard(private🔒)
All of the dashboard layout will have sidebar not navbar on the top.The dashboard layout has to be fully responsive.
Profile Page
Route: /dashboard/profile
Every user(admin, donner, or volunteer) will have a profile page. From where the user is able to see his name, email, avatar, address(district, upazila), blood group and able to update profile information. [ use a form to show all the information and keep an edit button on top of the form. Initially the form will not be editable. While the edit button will be clicked then the form will be editable and will appear a save button to save updated data to the database. After saving the updated data the form will go back to its initial state. It means again an edit button will appear on top of the form and form will be not editable. Keep in mind, the email will not be editable even after clicking on the edit button.]
4.1 Donor Dashboard
Dashboard Home page 🏠


Route: /dashboard
This page will display a welcome message with the user’s name(who has logged in as donor)
Below the welcome section donor will see his maximum 3 recent donation requests, those requested by himself. For example, if you are a donor then if you come to this page you will see your 3 recent donation requests (show as tabular format). If the user has not made any donation request yet this section will be hidden.
Every donation request will have the data mentioned below
recipient name
recipient location(where donor will need to go to donate the blood for the blood recipient. This row only shows the district and upazila which was provided while the request was created. look at the create donation request form. you will find to input: recipient district, recipient upazila)
donation date
donation time
blood group (A+, A-, B+, B-, AB+, AB-, O+, or O-)
donation status(pending, inprogress, done, canceled) - donor will find done and cancel button only while the donation status is inprogress. Then the status can be changed from inprogress to done, or inprogress to cancled. while the status will be done, or canceled both(done and canceled) buttons will be hidden again.
donor information - while the donation status will be inprogress the donation will have donor information(name, email)
edit button to edit the donation request(when click the button donor will be redirect to a page from where the donation request can be edit and update by clicking on update donation request button)
delete button to delete the donation request(will show a confirmation modal before deleting and by confirming the donation request will be deleted)
view button to go into the donation request details page(you will find details about this page below)
Below the 3 recent donation requests the donor will see a “view my all request” button. When the user clicks on the button, the user(donor) will be redirected to the “My Donation Requests” page. (Note: you will find details about this page below)
My Donation Requests Page🩸


Route: /dashboard/my-donation-requests
In this page user(donor) will see all of his donation requests those was requested by himself in a tabular format (same like “recent donation request” section table in the “Dashboard Home Page”)
The table will have the same content as “recent donation request” section in the “Dashboard Home Page”
In addition the table will have a pagination feature. (Pagination is part of the challenge requirement. If you don’t implement the pagination feature then show all data in a single table)
In addition the table will have a filtering option(”pending”, “inprogress”, “done”, “canceled”) based on the donation request(you will find more details about how this donation status works in the whole requirement. So read it very carefully)
Create Donation Request Page🆕


Route: /dashboard/create-donation-request
This page will have a form with the following input fields
requester name(read only - name of the logged in user)
requester email(read only - email of the logged in user)
recipient name
recipient district(select option)
recipient upazila(select option)
hospital name(where the donor will go to donate blood - like: Dhaka Medical College Hospital)
full address line(like: Zahir Raihan Rd, Dhaka)
blood group(a selector with option A+, A-, B+, B-, AB+, AB-, O+, O-)
donation date
donation time
request message(requester will write, why he need blood in this input field in details)
donation status(this will not be in the donation request form. you will add the status as pending as default value. Don’t add any input field for status)
request button (form will have a request button and clicking on the button a donation request will be created.)
💡 Blocked user is not able to create any donation request. Only the active user is able to create a donation request.


4.2 Admin Dashboard
Dashboard Home Page 🏠


Route: /dashboard
Will have the same welcome section like the “Donor Dashboard Home Page” welcome section
Below the welcome section will have 3 featured cards of the statistics. Every card will have a relevant icon, count number, and title. Have a look at this image link to get an idea: https://prnt.sc/h4qw_H22dX8x Don’t copy the design. Design it from your own.
total user(Donors)
total funding(users are able to donate a little money to help these organizations. We will talk about how to donate money in the bonus section). Look at the challenges requirement section. Showing total funds is part of the challenge requirement.
total blood donation request
All Users Page 👤


Route: /dashboard/all-users
All users data will be shown in tabular format in this page. The table will have a pagination feature (Pagination is part of the challenge requirement. If you don’t implement the pagination feature then show all data in a single table)
Table will have a filtering option(”active”, “blocked”) based on the user status.
In every table row will have
user avatar
user email
user name
user role
user status
a block button to block the user while the user status is “active”(clicking on the button admin is able to block the user. Then the user status will be “blocked”)
a unblock button to unblock the user while the user status is “blocked”(clicking on the button admin is able to unblock the user. Then the user status will be “active” again)
a make volunteer button to make a user from donor to volunteer. By clicking the button admin is able to give volunteer role to a user/donor
a make admin button to make a user from donor, or volunteer to admin. By clicking the button admin is able to give admin role to a user.
💡 You can use a three dot menu button with dropdown to manage all of the action button. It will be nicer to look at.


All Blood Donation Request Page🩸


Route: /dashboard/all-blood-donation-request
This page will have the same features and content like “My Donation Requests Page” from the donor dashboard. That means the admin will have the same privilege as a donor and be able to do anything that a donor can from his dashboard → “My Donation Requests Page”.
💡 The only difference is a donor from his dashboard is able to manage only his own donation requests. But the admin is able to manage all users' donation requests.


Content Management Page 📝


Route: /dashboard/content-management


This page will have an “Add Blog” button at the top right corner. while the button will be clicked, it will redirect to Add Blog Page.


Add Blog Page


Route: /dashboard/content-management/add-blog
This page will have a form with the following input fields
title(title of the blog)
thumbnail image(use imageBB to upload the thumbnail email)
content(blog content) - this will be a rich text editor. you can use **jodit-react** npm package for the rich text editor
form will have a create button to create a blog after filling the form.
💡 Every newly created blog status will be draft by default. Only an admin is able to change the status of a blog as published


Then below will have all of the blogs. Design this section with your likings. You are open to design this section either card or tabular format. Pagination is optional on this page. But it will be great if you are able to implement it.


Will have filtering option(dropdown with option draft and published)


Every blog will have a publish button if the blog status is on draft and again keep in mind, only an admin is able to publish a blog.


When the blog is in published status then it will have an unpublish button. An admin can unpublish the blog by clicking on the button. While the blog will be unpublished then the status will be draft again


Will have a delete button to delete the blog. Only an admin is able to delete a blog.


Implementing blog editing is optional but highly recommended to do this as well. 


4.3 Volunteer Dashboard
Dashboard Home Page 🏠


Route: /dashboard
Will be the same page like Admin Dashboard → Home Page
All Blood Donation Request Page🩸


Route: /dashboard/all-blood-donation-request


Will be the same page like Admin Dashboard → All Blood Donation Request Page. But volunteers will not have all of the permission or privilege like an admin. Let’s see what permission has to a volunteer below


Is able to see all blood donation requests with pagination and filtering functionality same as an admin (Pagination is part of the challenge requirement. If you don’t implement the pagination feature then show all data in a single table)
Is able to update the donation status only
Only these two functions are allowed for volunteers. Volunteers are restricted to do all other action in All Blood Donation Request management.


Content Management Page 📝


Route: /dashboard/content-management
Will be the same page link Admin Dashboard → Content Management Page. The only difference is admin is able to delete, publish blogs. But volunteers are not able to do that. Only these two actions are restricted for volunteers. Volunteers will have all other permission in content management like an admin.
5. Home Page(public)
Route: /
Navbar → will have a logo, donation requests, blog, login, link before logged in. and will have a logo, donation requests, blog, funding links and user avatar with dropdown(dashboard, logout button) after logged in.
Banner → will have a heading with a “Join as a donor” and “Search Donors” button
Clicking on the “Join as a donor” button will redirect the user to registration page
Clicking on the “Search Donors” button will redirect the user to search page
Featured section → make it from your own thinking. It should be relevant with the website.
Contact Us section → will have a contact form and contact number
Footer → make the footer relevant with the website theme and add useful links in the footer as well
6. Search page(public)
will have a search form with following input fields
blood group(a selector with option A+, A-, B+, B-, AB+, AB-, O+, O-)
district(select option)
upazila(select option)
search button
By default the search page will not have any donor data. After clicking on the search button by filling the search form donors list will be shown below based on the search. The view of this section depends on your website theme.
7. Blood Donation requests(public)
This page will only show all of the pending donation requests(card or tabular view)
Every donation request will have the following things
recipient name
location
blood group
date
time
view button
By clicking the view button the user is able to go to the details page of the donation request. This page is private. If the user is not logged in then redirect the user to the login page
8. Blood Donation Request Details Page(private🔒)
This page will have all of the information that was provided during creation of a donation request. (you will find on the → Create Donation Request Page)
Below that information will have a donate button. And by clicking on the button will open a modal with a form and confirm button
The form will have following input fields
donor name(read only - logged in user name)
donor email(read only - logged in user email)
By confirming donation the status for the donation will be changed pending to inprogress
8. Blog Page(public)
Will show all of the published blogs. You are free to design this page with your likings.
Make a detailed page for each blog to read the full blog.
You can implement search functionality into this page but it’s optional for you

Challenges Requirements
9. Funding Page(private🔒)
This page will show all of the funds made by the users. Show in tabular form.
Each funding will have the name of the user who has given the fund, fund amount, funding date
Keep a give fund button to give funding on this page at the top. By clicking the button users will be able to  give fund for the organization(integrate stripe payment method for this)
Showing total funds on admin and volunteers dashboard is part of a challenging task.
Show pagination where it is necessary.
10. JWT
Implement JWT on login and store the token and protect private APIs with JWT using browser localStorage


### API Endpoints

#### User Management
1. **Add User**
   - **Method:** `POST /users`
   - **Functionality:** Adds a new user to the database.
   - **Input:** User data (name, email, photo, etc.).

2. **Fetch User by Email**
   - **Method:** `GET /users/:mail`
   - **Functionality:** Fetches user details by email.

#### Lost & Found Campaigns
1. **Create Lost/Found Item Post**
   - **Method:** `POST /items`
   - **Functionality:** Adds a new lost or found item post to the database.

2. **Fetch All Posts**
   - **Method:** `GET /items`
   - **Functionality:** Retrieves all lost and found item posts.

3. **Fetch Post Details**
   - **Method:** `GET /items/:id`
   - **Functionality:** Fetches detailed information about a specific lost or found item post using its ID.

4. **Update Post**
   - **Method:** `PUT /items/:id`
   - **Functionality:** Updates an existing lost or found item post by its ID.

5. **Delete Post**
   - **Method:** `DELETE /items/:id`
   - **Functionality:** Deletes a specific lost or found item post by ID.

#### Recovered Items Management
1. **Mark as Recovered**
   - **Method:** `POST /recovered`
   - **Functionality:** Marks a lost or found item as recovered and stores recovery details (location, date, recovered by).

2. **Fetch All Recovered Items**
   - **Method:** `GET /recovered`
   - **Functionality:** Retrieves all recovered items with relevant details.

### Deployment Guidelines
- Ensure Firebase and MongoDB configurations are secured using environment variables.
- Fully responsive design optimized for mobile, tablet, and desktop.
- Avoid CORS/404/504 errors on production.

## Live Site
[Visit BloodBridge](https://sakib-welfare-champine.netlify.app/)

## GitHub Repositories
- **Server Repository:** [server-side-engrsakib](https://github.com/Programming-Hero-Web-Course4/b10a12-server-side-engrsakib)
- **Client Repository:** [client-side-engrsakib](https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-engrsakib)

## How to Run the Server
1. Clone the repository:
   ```bash
   git clone https://github.com/engrsakib/sakib-welfare-champine-server-side.git
   cd sakib-welfare-champine-server-side
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   nodemon index.js
   ```

## How to Run the Client
1. Clone the repository:
   ```bash
   git clone https://github.com/engrsakib/sakib-welfare-champine-client-side.git
   cd sakib-welfare-champine-client-side
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the client:
   ```bash
   npm start
   ```

## Contribution
Contributions are welcome! Feel free to submit issues or pull requests to improve the platform.

