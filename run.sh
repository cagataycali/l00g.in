#!/bin/bash
cd;
if [ -d ".ssh" ]; then
  if [ -f "config" ]; then
    echo "Config exist.";
  else
    echo "" > config;
  fi
fi
