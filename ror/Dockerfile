FROM ruby:2.2.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
WORKDIR /tmp
ADD Gemfile /tmp/Gemfile
ADD Gemfile.lock /tmp/Gemfile.lock
RUN bundle install
RUN mkdir /ror
WORKDIR /ror
