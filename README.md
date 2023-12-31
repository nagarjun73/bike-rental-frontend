**Project Summary: MotoMate**

Motomate app facilitates easy vehicle rentals for personal, official or trip purposes. Users can search, book, and pay for available vehicles based on location and dates with long-term rental options. Hosts manage their fleet, keep track vehicle locations ensuring a seamless experience for both users and hosts. 

**Screenshots**
![ScreenShot](https://bikerentals6.s3.ap-south-1.amazonaws.com/bikerentals/Screenshot+(32).png)
![ScreenShot](https://bikerentals6.s3.ap-south-1.amazonaws.com/bikerentals/Screenshot+(27).png)
![ScreenShot](https://bikerentals6.s3.ap-south-1.amazonaws.com/bikerentals/Screenshot+(28).png)
![ScreenShot](https://bikerentals6.s3.ap-south-1.amazonaws.com/bikerentals/Screenshot+(29).png)
![ScreenShot](https://bikerentals6.s3.ap-south-1.amazonaws.com/bikerentals/Screenshot+(26).png)
![ScreenShot](https://bikerentals6.s3.ap-south-1.amazonaws.com/bikerentals/Screenshot+(23).png)


**Dummy profile for testing** (Account creation process includes KYC. it needs admin approval for doc verification)
1. **User**
email: user1@gmail.com
pw: Secret@123

2. **Host**
email: host1@gmail.com
pw: Secret@123

3. **Admin**
email: admin2@gmail.com
pw: Secret@123

**Key Features:**

1. **User-Friendly Interface:** The frontend boasts an interactive and visually appealing interface, ensuring an effortless browsing and rental process for customers.

2. **Responsive Design:** The application is built with a responsive design, catering to various devices and screen sizes, thereby enhancing accessibility.

3. **Booking and Reservation System:** Implemented a comprehensive booking system allowing users to check availability, select bikes, and make reservations efficiently.

4. **Secure Payment Integration:** Integrated secure payment gateways to facilitate smooth and safe transactions for bike rentals.

5. **User Authentication and Profiles:** Implemented user authentication functionalities, enabling users to create profiles, manage bookings, and access personalized features.

6. **Dynamic Data Display:** Utilized React and other modern frontend frameworks to dynamically display bike details, availability, and rental options.

7. **Intuitive Navigation:** Ensured an intuitive navigation experience through well-organized menus and clear call-to-action elements for seamless user interaction.

**Technologies Used:**
Motomate Version 1 is a Fullstack web application. ReactJS and MaterialUI on frontend. NodeJS along with ExpressJS on Backend. MongoDB with Mongoose as a Database. Redux with Thunk is used for Managing Global state and UseReducer with ContexAPI Hook is used for maintaining User State. 

JsonWebToken based Authentication, Role Managment fuctionality for user to have the right amount of access of data and permission. Bcrypt.js for Password Encryption, Express Validator for middleware level validation and sanitization with loadsh.AWS S3 along with Multer is used for capturing and storing multiple images and made use of Nodemailer for Email Verification.

Formik and Yup for handling form validation and state management. made use of socket for tracking realtime location of vehicle and displayed on map using React leaflet library. Integrated Payment gateway using Stripe.
