# Build user-facing analytics dashboards into your React app with Tinybird and Confluent

Learn how to build a React app that emits data to a Confluent topic, uses Tinybird to query data and publish APIs, and integrate those APIs into a React app for user-facing analytics.

![Gif of the final game](/img/game-gif.gif)

### Prerequisites

- Python 3.8 (only if you use the data generator)
- Node.js

## Instructions

Follow these instructions to deploy the working version of this application.

### 0. Create a free Tinybird Workspace

First, create a [free Tinybird account](https://www.tinybird.co/signup). Then create a new Workspace when prompted. You can name it whatever you want.

### 1. Clone the repository

```sh
git clone https://github.com/tinybirdco/demo-user-facing-analytics-confluent.git
cd demo-user-facing-analytics-confluent
```

### 2. Install app dependencies

```sh
cd app
npm install
```

### 3. Create a Confluent Cloud Cluster and Topic

Note: You can use any Kafka technology, including Apache Kafka, Confluent Cloud, Redpanda, etc. with minimal changes.

If you haven't done so, [sign up](https://confluent.cloud/signup) for a Confluent Cloud account. Then create a cluster. Once you've created a cluster, create a topic called `game-events`. Once you've created a topic, create a key/secret pair to allow you to produce events to your new topic.

In addition, add the following to your `.env.local`:

```sh
CONFLUENT_CLIENT_ID='<your cluster id>`
CONFLUENT_BROKER_URL='<your boostrap server url>'
CONFLUENT_API_KEY='<your confluent key>'
CONFLUENT_API_SECRET='<your confluent secret>'
```

### 4. Install the Tinybird CLI

```sh
cd tinybird
python -m venv .venv
source .e/bin/activate
pip install tinybird-cli
```

### 5. Authenticate to Tinybird

Copy your User Admin Token from the Tinybird UI. Your user admin token is the token with the format admin <your email address>.

From the `/tinybird` directory, run the following command:

```sh
export TB_TOKEN=<your user admin token>
tb auth
```

> :warning: Your token and workspace details will be stored in a .tinyb file. If you intend to push this to a public repository, add the `.tinyb` to your `.gitignore`.

### 6. Connect Confluent to Tinybird

Run the following command to connect your Tinybird Workspace to your Redpanda cluster.

```sh
cd tinybird
tb connection create kafka --bootstrap-servers <your confluent boostrap server> --key <your confluent key> --secret <your confluent secret> --connection-name confluent
```

> Note: You can also do this from the Tinybird UI.

### 7. Push the resources to Tinybird

Run the following command to push Tinybird resources to the Tinybird server.

```sh
cd tinybird
tb push --force
```

### 9. Add your Tinybird host and token to .env

Open your `env.local` and add the following:

```
TINYBIRD_HOST=<your tinybird host>>
TINYBIRD_TOKEN=<the read_endpoints token from your Workspace>
```

Note you can copy the `read_endpoints` token from the Tinybird CLI with `tb token copy read_endpoints`.

### Run the proxy server.

This app uses a proxy to handle requests to Confluent and to store Tinybird tokens. Run the proxy server from the `/services` directory:

```
node confluent-proxy.js
```

If you visit `http://localhost:3001` you'll see a message that the microservice is running.

### 10. Run the app!

Run the application!

```sh
npm run dev
```

Open it at `http://localhost:3000` and play the game. Have fun!

## Contributing

If you find any issues or have suggestions for improvements, please submit an issue or a [pull request](https://github.com/tinybirdco/demo-user-facing-analytics-color-picker/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc).

## License

This code is available under the MIT license. See the [LICENSE](https://github.com/tinybirdco/demo-user-facing-analytics-color-picker/blob/main/LICENSE.txt) file for more details.

## Need help?

&bull; [Community Slack](https://www.tinybird.co/community) &bull; [Tinybird Docs](https://www.tinybird.co/docs) &bull;

## Authors

- [Cameron Archer](https://github.com/tb-peregrine)
