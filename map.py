#!/usr/bin/env python

import os, json, csv, traceback, argparse, ujson
from util import util
from collections import Counter
from flask import Flask, render_template, request, jsonify, json, url_for, flash, redirect

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
# general flask app settings
app = Flask('map')
app.secret_key = 'some_secret'

all_tweets = []

# This call kicks off all the main page rendering.
@app.route('/')
def index():
    return render_template('main.html')
 
# Returns tweets from a given user.
@app.route('/get-user-tweets', methods=['GET'])
def get_user_tweets():
    user_screen_name = request.args.get('user_screen_name', '', type=str)
    if user_screen_name == '':
        return jsonify([])

    # Just make up a fake "home" location.
    home_location = (40.4416, -80)

    user_tweets = [tweet for tweet in all_tweets if tweet['user']['screen_name'].lower() == user_screen_name.lower()]
    days_ago_param = request.args.get('last_n_days', type=int)
    if days_ago_param:
        print "checking days_ago"
        print len(user_tweets)
        user_tweets = [tweet for tweet in user_tweets if util.get_days_ago(tweet) < days_ago_param and util.get_days_ago(tweet) >= 0]
        print len(user_tweets)

    tweet_time_param = request.args.get('tweet_time')
    if tweet_time_param != 'all':
        print "checking tweet_time"
        print len(user_tweets)
        user_tweets = [tweet for tweet in user_tweets if util.get_tweet_time(tweet) == tweet_time_param]
        print len(user_tweets)

    # Should we get all tweets, or just bins of tweets?
    all_tweets_param = request.args.get('all_tweets')
    if all_tweets_param and all_tweets_param == 'true':
        tweets = user_tweets
    else:
        tweets = []

    bins = Counter()
    for tweet in user_tweets:
        if util.has_valid_coordinates(tweet):
            coords = tweet['coordinates']['coordinates']
            lon = coords[0]
            lat = coords[1]
            bins[util.round_latlon(lat, lon)] += 1

    # "predictions" is not really a great name anymore
    predictions = [[key[0], key[1], value] for (key, value) in bins.items()]
    predictions = sorted(predictions, key=lambda p: p[2], reverse=True)

    return jsonify(tweets=tweets, user_home=home_location, predictions=predictions[0:10])

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--tweets_json_file', default='emoji_tweets_small.json')
    args = parser.parse_args()
    print "loading all tweets"
    all_tweets = ujson.load(open(args.tweets_json_file))
    print "done loading all tweets"
    app.run(host='127.0.0.1', debug=True)  # listen on localhost only (for local testing)
