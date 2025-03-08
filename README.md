# Serverless Movie Application

This project demonstrates how to create and deploy a serverless application using AWS Cloud Development Kit (CDK). The application includes a DynamoDB table to store movie information and Lambda functions to interact with the table.

## Features

- Create a DynamoDB table to store movie data
- Seed the DynamoDB table with initial movie data
- Lambda function to get a movie by its ID
- Lambda function to get all movies from the table
- CloudWatch integration for logging and debugging
- IAM role permissions to secure access to resources

## Prerequisites

- AWS account
- AWS CLI installed and configured
- AWS CDK installed (`npm install -g aws-cdk`)
- Node.js installed

## Project Structure

```
.
├── README.md
├── bin
│   └── simple-app.ts
├── lib
│   └── simple-app-stack.ts
├── lambdas
│   ├── getAllMovies.ts
│   ├── getMovieById.ts
├── seed
│   └── movies.ts
├── shared
│   ├── types.d.ts
│   ├── util.ts
└── package.json
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/deepanshub9/EWD-Basic-Serverless-app..git

   cd simple-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Deployment

1. Bootstrap your AWS account:

   ```bash
   cdk bootstrap
   ```

2. Deploy the stack:
   ```bash
   cdk deploy
   ```

## Lambda Functions

### Get Movie by ID

This Lambda function retrieves a movie by its ID from the DynamoDB table.

**Handler Code (`lambdas/getMovieById.ts`)**

### Get All Movies

This Lambda function retrieves all movies from the DynamoDB table.

**Handler Code (`lambdas/getAllMovies.ts`)**

## Seeding the DynamoDB Table

The DynamoDB table is seeded with initial movie data during deployment.

**Utility Functions (`shared/util.ts`)**

## IAM Role Permissions

The IAM role associated with the Lambda functions is granted the necessary permissions to access the DynamoDB table.

## Debugging with CloudWatch

CloudWatch is used to log and debug the Lambda functions.

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, please contact [deepanshu.b096@gmail.com](mailto:deepanshu.b096@gmail.com)
