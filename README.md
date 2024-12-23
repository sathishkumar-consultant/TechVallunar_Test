Prerequisites

Ensure you have Node.js installed. If not, follow the steps below to install it.

Install Git if you haven't already. You can download it from Git Downloads.

Installation Steps

1. Install Node.js

Visit the Node.js download page.

Download the LTS version for your operating system.

Follow the installation instructions specific to your OS.

Verify the installation by running the following commands in your terminal:

node -v


npm -v

2. Clone the Repository

Open a terminal or command prompt.

Run the following command to clone the repository:

git clone https://github.com/sathishkumar-consultant/TechVallunar_Test.git

Navigate to the cloned directory:

cd TechVallunar_Test

3. Install Dependencies

Use the package-lock.json file to install the required dependencies:

npm ci

4. Run Tests

Set the environment variable and execute the test command:

ENV=dev npx wdio wdio.conf.js tests/specs/*.js

This will run all the test files located in the tests/specs/ directory.
