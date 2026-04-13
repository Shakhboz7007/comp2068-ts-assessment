# In-Class Assessment Setup Instructions

## Before You Begin

### 1. Create Environment File
Create a `.env` file in the MERN-BACKEND directory with the following content:

```
DB_CONN_STRING=mongodb+srv://your_username:your_password@cluster.mongodb.net/
DB_NAME=movieDB
COLLECTION_NAME=movies
```

**Replace `your_username` and `your_password` with your MongoDB Atlas credentials.**

---

### 2. File to Work On
Complete all tasks in: `in-class-assessment.ts`

---

### 3. Time Limit
**60 minutes** - Manage your time wisely!

---

### 4. Recommended Approach

#### First 10 minutes: Setup & Planning
- [ ] Read through all TODO tasks
- [ ] Create your `.env` file
- [ ] Understand the Movie schema requirements

#### Rest of the assessment time: Implementation
Work through tasks in order:
1. Imports (2-3 minutes)
2. Interface (2-3 minutes)
3. Express setup (2-3 minutes)
4. Database function (5-7 minutes)
5. GET all movies 
6. GET single movie
7. POST new movie
8. PUT update movie
9. DELETE movie
10. Server startup

#### Last 10 minutes: Testing & Debugging
- [ ] Test each endpoint with Postman or your preferred client
- [ ] Fix any errors
- [ ] Verify all TODO tasks are complete

---

### 5. Testing Your API

#### Using Postman or your preferred client

**GET All Movies**
```
GET http://localhost:5000/api/movies
```

**GET Single Movie**
```
GET http://localhost:5000/api/movies/YOUR_MOVIE_ID_HERE
```

**POST New Movie**
```
POST http://localhost:5000/api/movies
Content-Type: application/json

{
  "title": "The Matrix",
  "director": "Wachowski Sisters",
  "year": 1999,
  "rating": 9
}
```

**PUT Update Movie**
```
PUT http://localhost:5000/api/movies/YOUR_MOVIE_ID_HERE
Content-Type: application/json

{
  "rating": 10
}
```

**DELETE Movie**
```
DELETE http://localhost:5000/api/movies/YOUR_MOVIE_ID_HERE
```

---

### 6. Common Errors & Quick Fixes

#### "Cannot find module 'express'"
```bash
npm install
```

#### "DB_CONN_STRING is not defined"
- Check your `.env` file exists
- Make sure you called `dotenv.config()`

#### "Cannot set headers after they are sent"
- Remove duplicate `res.send()` or `res.json()` calls
- Make sure you `return` after sending error responses

#### Server won't start
- Check if port 5000 is already in use
- Make sure database connection is successful
- Look for syntax errors in your code

---

### 7. Submission Checklist

Before submitting, ensure:
- [ ] All 10 TODO tasks are completed
- [ ] No syntax errors (code compiles)
- [ ] At least 3 endpoints work when tested
- [ ] Database connection is successful
- [ ] File is named correctly: `in-class-assessment.ts`

---

### 8. Grading Criteria

- Each TODO task is worth **1 mark**
- Total: **10 marks**
- Partial credit may be given for partially completed tasks
- Code must compile and run (even with minor bugs)

---

### 9. Tips for Success

✅ **DO:**
- Read each TODO carefully before coding
- Use the solution from your sushi.routes.ts as reference
- Test frequently as you build
- Use TypeScript types correctly
- Handle errors with try-catch blocks
- Use `async/await` for all database operations

❌ **DON'T:**
- Rush through without reading instructions
- Copy code without understanding it
- Forget to use `new ObjectId()` for MongoDB IDs
- Skip error handling
- Forget to start the server inside `.then()` block

---

### 10. Resources You Can Use

During the assessment, you may refer to:
- Your own code from previous labs (sushi routes, database service)
- MongoDB documentation
- TypeScript documentation
- Express documentation
- Class notes and examples

**You MAY NOT:**
- Use AI assistants (ChatGPT, Copilot, etc.)
- Communicate with other students
- Share code with classmates

---

## Good Luck! 🎬
