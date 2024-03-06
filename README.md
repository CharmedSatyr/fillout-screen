# fillout-screen

## About
- This project was built as part of a software engineering screening for [Fillout](https://www.fillout.com/).
- It makes use of [Fillout's `GET /v1/api/forms/{formId}/submissions`](https://www.fillout.com/help/fillout-rest-api#d8b24260dddd4aaa955f85e54f4ddb4d) endpoint on the backend.
- It uses [Node](https://nodejs.org/en/blog/release/v20.10.0), [pnpm](https://pnpm.io/), [Express](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/), [Prettier](https://prettier.io/), [Jest](https://jestjs.io/), and [nodemon](https://nodemon.io/).
- It is deliberately incomplete due to time constraints and is only intended to preview my skillset.

### Links
- [GitHub](https://github.com/CharmedSatyr/fillout-screen) repo
- [Railway](https://fillout-screen-production-23c1.up.railway.app/) deployment
- [Requirements](https://fillout.notion.site/Software-engineering-screen-fbd58fd78f59495c99866b91b1358221)

### Setup
- Create a local `.env` file and add entries for `PORT` and your Fillout `API_KEY`.
- Install dependencies: `pnpm install`
- Build the project: `pnpm build`
- Run the project: 
  - `pnpm start` for a production environment
  - `pnpm dev` for a development environment 

### Calling the endpoint
- This application supports a basic home page and one endpoint, `GET /:id/filteredResponses`, where `:id` is a Fillout `formId`.
- The endpoint [Fillout's `GET /v1/api/forms/{formId}/submissions]( https://www.fillout.com/help/fillout-rest-api#d8b24260dddd4aaa955f85e54f4ddb4d) endpoint.
- See [Requirements](https://fillout.notion.site/Software-engineering-screen-fbd58fd78f59495c99866b91b1358221) for more information about input and output.

### Example
- I use [Insomnia](https://insomnia.rest) to test this endpoint.

- Where `limit` is `1` and `filters` are the following:
```json
[
	{
		"id": "bE2Bo4cGUv49cjnqZ4UnkW",
		"value": "Johnny",
		"condition": "equals"
	}
]
```

- Request
```curl
curl --request GET \
  --url 'https://fillout-screen-production-23c1.up.railway.app/cLZojxk94ous/filteredResponses?filters=%5B%0A%09%7B%0A%09%09%22id%22%3A%20%22bE2Bo4cGUv49cjnqZ4UnkW%22%2C%0A%09%09%22value%22%3A%20%22Johnny%22%2C%0A%09%09%22condition%22%3A%20%22equals%22%0A%09%7D%0A%5D&limit=1' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.6.1'
```

- Response:
```json
{
	"responses": [
		{
			"submissionId": "ab9959b2-73e8-4994-85b9-56e780b89ce3",
			"submissionTime": "2024-02-27T19:37:08.228Z",
			"lastUpdatedAt": "2024-02-27T19:37:08.228Z",
			"questions": [
				{
					"id": "4KC356y4M6W8jHPKx9QfEy",
					"name": "Anything else you'd like to share before your call?",
					"type": "LongAnswer",
					"value": "Nothing much to share yet!"
				},
				{
					"id": "bE2Bo4cGUv49cjnqZ4UnkW",
					"name": "What is your name?",
					"type": "ShortAnswer",
					"value": "Johnny"
				},
				{
					"id": "dSRAe3hygqVwTpPK69p5td",
					"name": "Please select a date to schedule your yearly check-in.",
					"type": "DatePicker",
					"value": "2024-02-01"
				},
				{
					"id": "fFnyxwWa3KV6nBdfBDCHEA",
					"name": "How many employees work under you?",
					"type": "NumberInput",
					"value": 2
				},
				{
					"id": "jB2qDRcXQ8Pjo1kg3jre2J",
					"name": "Which department do you work in?",
					"type": "MultipleChoice",
					"value": "Engineering"
				},
				{
					"id": "kc6S6ThWu3cT5PVZkwKUg4",
					"name": "What is your email?",
					"type": "EmailInput",
					"value": "johnny@fillout.com"
				}
			],
			"calculations": [],
			"urlParameters": [],
			"quiz": {},
			"documents": []
		}
	],
	"totalResponses": 1,
	"pageCount": 1
}
```