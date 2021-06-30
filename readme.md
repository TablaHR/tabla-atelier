# Tabla Marketplace
Tabla Marketplace represents the core functionality of an e-commerce experience, integrating product detail, product comparisons, and product reviews in an easy-to-use and modern interface..

## Installation

After cloning the repository to a server, dependencies not included with the Tabla Marketplace repository are available via [NPM](https://www.npmjs.com/), and defined in the repository's package.json.

```bash
npm install
```

## Usage

Tabla Marketplace requires [two Amazon S3 buckets](https://aws.amazon.com/aws/s3) to function, one for review photo storage and another for click analytics.

Environment variables are all loaded in a single .env file in the root directory of the project and implemented [via dotenv](https://www.npmjs.com/package/dotenv).

A sample of the .env format required is included below and in the repository at .env.sample

```javascript
EXPRESS_SERVER=http://localhost:3000
EXPRESS_PORT=3000
GITHUB_TOKEN=token_text
S3_REGION=s3_region
AWS_ACCESS_KEY_ID=aws_key
AWS_SECRET_ACCESS_aws_secret
AWS_S3BUCKET_CLICKS=aws_bucketname_clicks
AWS_S3BUCKET_REVIEW_PHOTOS=aws_bucketname_photos
```

## Contributing
Pull requests are welcome and encouraged. For major changes or feature requests, please [open an issue first](https://github.com/TablaHR/tabla-atelier/issues) to bring the conversation to the community.

## License
[MIT](https://choosealicense.com/licenses/mit/)