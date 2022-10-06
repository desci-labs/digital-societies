#!/bin/bash

yarn test

wait 

(trap 'kill 0' SIGINT; yarn node:start &)

sleep 2

yarn gsn &

sleep 5

yarn test:gsn --network localhost

killall node

echo "Done 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥"