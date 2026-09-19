#!/bin/bash

echo "Starting local development server..."
echo ""
echo "Your portfolio will be available at:"
echo "http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 -m http.server 8000
