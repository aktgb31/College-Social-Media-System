# College Social Media System Backend

## Setting up the server

### Installing the Dependencies

1. Install latest version of Nodejs
2. Run `npm install` to download and install the dependencies required

### Setting up the environment variables

Create a new .env file with the following variables

#### Environment Variables

- **NODE_ENV** set to "development" for development mode
- **PORT** The port on which server is to be started
- **DATABASE_URI** The MYSQL database url
- **DATABASE_NAME** The MYSQL database name
- **DATABASE_USER** Database User Name
- **DATABASE_PASS** Database User password
- **SESSION_SECRET** Key to encrypt sessions
- **GMAIL_ID** Gmail id to send mails to users
- **GMAIL_PASSWORD** Gmail password

To start the Server, run `npm start` and the server will start on http://localhost:PORT


## API Documentation

### User Related 

* #### Create Student account

	* **URL:** `/api/user/register/student`
	
	* **Method:** `POST`

	* **Request Body:**

		| Field | Type | Description |
		|--- | ---| ---|
		|firstName | string |  First Name of the student |
		|lastName | string | Last Name of the student |
		|passingYear|string| Passing Year of the student |
		|branch| string| Branch of the student |
		|dob|date| Date of Birth of the student in `yyyy-mm-dd`|

	* **Success Response:**
	
		* **Code:** 201
	
			**Content:** 
            ```json
            {
	    		"success": true,
	    		"message": "Student Registered Successfully"
            }
            ```
	* **Error Response:**   
		
		* **Code:** 409
	
			**Content:**
            ```json
            {
	    		"success": false,
	    		"message": "User already Exists"
            }
            ```
	    
	    * **Code:** 400
	
			**Content:** 
            ```json
            {
	    		"success": false,
	    		"message": "'Field' is required/invalid"
            }
            ```

	    
* #### Create Club account
	* **URL:** `/api/user/register/club`
	
  	* **Method:** `POST`
  	
  	* **Request Body:**
 
 		| Field | Type | Description |
      |--- | ---| ---|
      |name | string | Name of the club |
      |clubType | string | Type of the club i.e "Technical", "Cultural" etc. |

  * **Success Response:**

      * **Code:** 201

          **Content:** 
          ```json
          {
      		"success": true,
      		"message": "Club Registered Successfully"
          }
          ```
  * **Error Response:**   

      * **Code:** 409

          **Content:** 
          
          ```json
          {
      		"success": false,
      		"message": "User already Exists"
          }
           ```
          
      * **Code:** 400

          **Content:** 
          ```json
         {
      		"success": false,
      		"message": " 'Field' is required/invalid"
         }
         ```
      

* #### User Login

  * **URL:** `/api/user/login`

  * **Method:** `POST`

  * **Request Body:**

      | Field | Type | Description |
      |--- | ---| ---|
      |emailId | string | Email Id of registered user |
      |password | string | Password for account |

  * **Success Response:**

      * **Code:** 202

          **Content:** 
          ```json
          {
      		"success": true,
      		"message": "Login Successful"
          }
          ```
  * **Error Response:**   

      * **Code:** 400

          **Content:** 
          ```json
          {
      		"success": false,
      		"message": "Invalid 'fields'/ 'Fields' missing"
          }
          ```
      * **Code:** 403

          **Content:** 
          ```json
          {
      		"success": false,
      		"message": "User already logged in"
          }
          ```


* #### User Logout

  * **URL:** `/api/user/logout`

  * **Method:** `POST`
  
  * * **Auth Required:** Yes

  * **Request Body:** None

  * **Success Response:**

      * **Code:** 200

          **Content:** 
          ```json
          {
      		"success": true,
      		"message": "Logout Successful"
          }
          ```
  * **Error Response:**   

      * **Code:** 401

          **Content:** 
          ```json
          {
      		"success": false,
      		"message": "Please log in to access this resource"
          }
          ```

* #### User Profile

  * **URL:** `/api/user/profile`

  * **Method:** `GET`
  * **Auth Required:** Yes

  * **Request Body:**
  
  	(Any one required. userId will be preferred if both are given)
    | Field | Type | Description |
      |--- | ---| ---|
      |userId | integer | userId of the user |
      |emailId | string | emailId of the user |

  * **Success Response:**
  	
      * **Code:** 200

          **Content:** 
          ```json
          {
          	"success": true,
          	"isSameUser": true/false, // true when current user is same as user requested
          	"user":	{
            			"userId":  ,
                        "emailId": ,
                        "userType: "CLUB"/"STUDENT" ,
                        "verified": 1/0 ,
                        "club":	{  // When requested user is club
                        			"name" : ,
                                    "clubType" : ,
                                    "profilePic" : ,
                        		},
                        "student": { // When requested user is student
                        			"firstName" : ,
                                    "lastName" : ,
                                    "passingYear": ,
            						"branch": ,
            						"dob": ,
            						"gender": ,
            						"profilePic": ,
                        		   }
            		}
          }
          ```
   
  * **Error Response:**   

      * **Code:** 401

        **Content:** 
        ```json
        {
      		"success": false,
      		"message": "Please log in to access this resource"
        }
      	```
      
      * **Code:** 400

        **Content:** 
       	```json
        {
      		"success": false,
      		"message": "Invalid 'Field'/'Field' is required"
        }
      	```
      
      * **Code:** 404

        **Content:**
        ```json
        {
      		"success": false,
      		"message": "User not found"
        }
      	```
      