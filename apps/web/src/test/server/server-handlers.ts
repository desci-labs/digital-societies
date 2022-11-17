import { rest } from "msw";

export const handlers = [
  rest.get(`/`, async (req, res, ctx) => {
    if (!req.url.searchParams.has("q")) {
      return res(ctx.status(400), ctx.json(errors.requiredParam));
    }

    const query = req.url.searchParams.get("q");

    if (!query) {
      return res(ctx.status(400), ctx.json(errors.missingQuery));
    }

    return res(ctx.json({}));
  }),
];

// const getToken = (req: Request) => req.headers.get('Authorization')?.replace('Bearer ', '')

export const errors = {
  missingQuery: {
    error: {
      code: 400,
      message: "Missing query.",
      errors: [
        {
          message: "Missing query.",
          domain: "global",
          reason: "queryRequired",
          location: "q",
          locationType: "parameter",
        },
      ],
    },
  },
  requiredParam: {
    error: {
      code: 400,
      message: "Required parameter: q",
      errors: [
        {
          message: "Required parameter: q",
          domain: "global",
          reason: "required",
        },
      ],
    },
  },
};
