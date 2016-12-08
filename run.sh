#!/bin/bash
cd;
if [ -d ".ssh" ]; then
  cd .ssh;
  echo "CD SSH";
  pwd;
  if [ -f "config" ]; then
    echo "Config exist.";
  else
    echo "" > config;
  fi
fi
