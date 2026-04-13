#!/bin/bash
rm -rf dist
npm run build
npx wrangler pages deploy dist --project-name ideas-to-life-ai --branch main
