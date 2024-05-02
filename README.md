# Build user-facing analytics dashboards into your React app with Tinybird and Confluent

Learn how to build a React app that emits data to a Confluent topic, uses Tinybird to query data and publish APIs, and integrate those APIs into a React app for user-facing analytics.

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

Then, export the following environment variables to your machine:

```sh
EXPORT CONFLUENT_BOOTSTRAP_SERVER=<your bootstrap server address>
EXPORT CONFLUENT_KEY=<your Confluent key>
EXPORT CONFLUENT_SECRET=<your Confluent secret>
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
TB auth
```

> :warning: Your token and workspace details will be stored in a .tinyb file. If you intend to push this to a public repository, add the `.tinyb` to your `.gitignore`.

### 6. Connect Redpanda to Tinybird

Run the following command to connect your Tinybird Workspace to your Redpanda cluster.

```sh
cd tinybird
tb connection create kafka --bootstrap-servers $CONFLUENT_BOOTSTRAP_SERVER --key $CONFLUENT_KEY --secret $CONFLUENT_SECRET --connection-name confluent
```

Note: You can also do this from the Tinybird UI.

### 7. Push the resources to Tinybird

Run the following command to push Tinybird resources to the Tinybird server.

```sh
cd tinybird
tb push --force
```

### 8. Start streaming data to Redpanda

Use the data generator to start streaming data to a topic. The script accepts a single argument for the approximate number of events per second you want to send:

```sh
cd datagen
python generate_mock_data.py 50
```

### 9. Add your Tinybird token

Open [analytics.js](/app/components/analytics.js).

Copy the `read_all_pipes` token from your Tinybird Workspace and paste it into line 10

Copy your Tinybird Host (e.g. `api.tinybird.co`) and paste into line 9.

Note: this is only for local development. Use proper token management if you intend to host this application or make your repository public.

### 10. Run the app!

```sh
npm run dev
```

### 11. Open the dashboard!

You should now have a functioning app with user-facing analytics dashboard at localhost:3000. Click some colors and watch your dashboards update!

## Contributing

If you find any issues or have suggestions for improvements, please submit an issue or a [pull request](https://github.com/tinybirdco/demo-user-facing-analytics-color-picker/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc).

## License

This code is available under the MIT license. See the [LICENSE](https://github.com/tinybirdco/demo-user-facing-analytics-color-picker/blob/main/LICENSE.txt) file for more details.

## Need help?

&bull; [Community Slack](https://www.tinybird.co/community) &bull; [Tinybird Docs](https://www.tinybird.co/docs) &bull;

## Authors

- [Cameron Archer](https://github.com/tb-peregrine)
