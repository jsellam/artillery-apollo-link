import { ApolloLink } from "@apollo/client";
import { print } from "graphql";
import { stringify } from "yaml";

export type ArtilleryApolloLinkConfig = {
  name: string;
  url: string;
  headers?: Record<string, string>;
  thinkMapper?: (timeMs: number) => string;
  disabled?: boolean;
};

export function createArtilleryApolloLink({
  name,
  url,
  headers = undefined,
  thinkMapper = (time) => time + "ms",
  disabled = false,
}: ArtilleryApolloLinkConfig) {
  let lastQueryTime = 0;
  const flowList: any[] = [];
  const flow = [
    {
      name,
      weight: 1,
      flow: flowList,
    },
  ];

  return new ApolloLink((operation, forward) => {
    if (disabled) {
      return forward(operation);
    }
    const { query, variables, operationName } = operation;

    if (lastQueryTime > 0) {
      const diff = Date.now() - lastQueryTime;
      if (diff > 200) {
        flowList.push({ think: thinkMapper(diff) });
      }
    }

    lastQueryTime = Date.now();

    flowList.push({
      post: {
        name: operationName || "Unnamed",
        url,
        headers: headers ? { ...headers } : undefined,
        json: {
          query: print(query),
          variables: variables,
        },
        expect: [{ statusCode: 200 }, { notHasProperty: "errors" }],
      },
    });

    console.log("\n" + stringify(flow));
    return forward(operation);
  });
}
