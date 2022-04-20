# seneca-task by Jeremy Law

---

# Set-up

1. Clone the repo from https://github.com/jeremylaw95/sen-task.git

2. Install any node modules: **npm install**

3. Run using: **npm start**

4. OPTIONAL - Drop all current tables, create new tables and populate them using: **npm run reinit** or run them individually (check package.json for all scripts)

5. Test using: **npm test** to run jest/supertest testing

# General Info

- Used NodeJS with Express
- Set up a PostgreSQL DB using Heroku with DATABASE_URL in the .env file

# Assumptions/Deviations

- Altered YAML file to contain defaults with existing table data
- Assumed that average score shows as a percentage and that each module counts evenly towards this average percentage in each session
- Aggregated average score in course lifetime get request (/courses/:courseId) is weighted depending on both total modules studied per session e.g. 10 modules with average score of 80% counts more than 5 modules at an average score of 80%
