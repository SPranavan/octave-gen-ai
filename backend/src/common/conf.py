import yaml
import os

def read_conf():
    with open('conf/config.yaml') as f:
        conf = yaml.safe_load(f)
    return conf

config = read_conf()
