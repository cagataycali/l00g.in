#!/bin/bash
cd;
if [ -d ".ssh" ]; then
  if [ -f "config" ]; then
    echo "Config exist.";
  else
    touch config;
  fi
fi
