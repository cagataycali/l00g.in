#!/bin/bash
cd;
if [ -d ".ssh" ]; then
  cd .ssh;
  if [ -f "config" ]; then
    echo "Config exist.";
  else
    echo "" > config;
  fi
fi
