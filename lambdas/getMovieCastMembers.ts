import { Handler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import { MovieCast, MovieDetails, GetMovieCastResponse } from "../shared/types";

const ddbDocClient = createDocumentClient();

export const handler: Handler = async (event, context) => {
  try {
    console.log("Event:", JSON.stringify(event));
    const queryParams = event?.queryStringParameters;
    if (!queryParams) {
      return {
        statusCode: 500,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "Missing query parameters" }),
      };
    }
    if (!queryParams.movieId) {
      return {
        statusCode: 500,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "Missing movie Id parameter" }),
      };
    }
    const movieId = parseInt(queryParams?.movieId);
    let commandInput: QueryCommandInput = { TableName: process.env.CAST_TABLE_NAME };

    if ("roleName" in queryParams) {
      commandInput = {
        ...commandInput,
        IndexName: "roleIx",
        KeyConditionExpression: "movieId = :m and begins_with(roleName, :r)",
        ExpressionAttributeValues: {
          ":m": movieId,
          ":r": queryParams.roleName,
        },
      };
    } else if ("actorName" in queryParams) {
      commandInput = {
        ...commandInput,
        KeyConditionExpression: "movieId = :m and begins_with(actorName, :a)",
        ExpressionAttributeValues: {
          ":m": movieId,
          ":a": queryParams.actorName,
        },
      };
    } else {
      commandInput = {
        ...commandInput,
        KeyConditionExpression: "movieId = :m",
        ExpressionAttributeValues: { ":m": movieId },
      };
    }

    const commandOutput = await ddbDocClient.send(new QueryCommand(commandInput));
    let response: GetMovieCastResponse = { data: commandOutput.Items as MovieCast[] };

    if (queryParams.movie === "true") {
      const movieDetails = getMovieDetails(movieId); 
      response = { ...response, movie: movieDetails };
    }

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.log(JSON.stringify(error));
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error }),
    };
  }
};

function createDocumentClient() {
  const ddbClient = new DynamoDBClient({ region: process.env.REGION });
  const marshallOptions = { convertEmptyValues: true, removeUndefinedValues: true, convertClassInstanceToMap: true };
  const unmarshallOptions = { wrapNumbers: false };
  const translateConfig = { marshallOptions, unmarshallOptions };
  return DynamoDBDocumentClient.from(ddbClient, translateConfig);
}

function getMovieDetails(movieId: number): MovieDetails {
  // Mock function to get movie details
  return {
    title: "Example Movie",
    genreIds: [1, 2, 3],
    overview: "This is an example movie overview.",
  };
}
