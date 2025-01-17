#!/usr/bin/env bash

dev=false
while getopts d flag
do
    case "${flag}" in
        d) dev=true;;
        # a) age=${OPTARG};;
    esac
done

cargo build || exit 1

docker compose up -d dbit

RUST_ENV=it cargo run || exit 1 &
job1=$!
pnpm --filter db start || exit 1 &
job2=$!

pnpm --filter db --filter rust_backend it:dep && pnpm --filter db clean_db && pnpm --filter be_it jest
status=$?

kill $job1
kill $job2

exit $status
