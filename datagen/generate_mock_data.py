from kafka import KafkaProducer
import random
import time
from datetime import datetime
import os
import json
import sys

producer = KafkaProducer(
    bootstrap_servers=os.environ['REDPANDA_BOOTSTRAP_SERVER'],
    security_protocol="SASL_SSL",
    sasl_mechanism='SCRAM-SHA-256',
    sasl_plain_username=os.environ['REDPANDA_USER'],
    sasl_plain_password=os.environ['REDPANDA_PASSWORD']
)


def generate_random_name():
    names = ['Alice', 'Bob', 'Charlie', 'David', 'Emma',
             'Frank', 'Grace', 'Henry', 'Ivy', 'Jack']
    return random.choice(names)


def generate_random_hex_color():
    return '#{0:06x}'.format(random.randint(0, 0xFFFFFF)).upper()


def generate_timestamp():
    return datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%3Z')


def generate_message():
    name = generate_random_name()
    color = generate_random_hex_color()
    timestamp = generate_timestamp()

    payload = {
        "user": name,
        "timestamp": timestamp,
        "color": color
    }

    return json.dumps(payload)


def generate_data(eps):
    while True:
        print(f'Sending {eps} records...')
        for _ in range(eps):
            message = generate_message()
            producer.send('color-picker', value=str.encode(message))
        producer.flush()
        time.sleep(1)  # 1 second pause


if __name__ == '__main__':
    try:
        eps = int(sys.argv[1])
    except:
        eps = 1
    generate_data(eps)
