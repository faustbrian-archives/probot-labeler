#!/bin/sh
now="npx now --debug --token=$NOW_TOKEN"

echo "$ now rm --safe --yes labeler"
$now rm --safe --yes labeler

echo "$ now --public"
$now --public

echo "$ now alias"
$now alias
