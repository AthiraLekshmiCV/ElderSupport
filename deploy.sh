#!/usr/bin/env bash
set -e
echo "Building frontend..."
(cd frontend && npm install && npm run build)
echo "Deploying functions and hosting..."
firebase deploy --only functions,hosting
echo "Deployed."
