# PRODUCT ENGINEER TEST

## Scope

The goal was to have a decoder in the backend and a SPA in the frontend communicating to translate
from a cyphered code to text.

## Expanding the functionality
I made also an electron app which decode the messages in the client machine from a binary,
without exposing the cypher algorithm.

I expanded also to encode the messages, and finally added web sockets to allow the communication.

The result is a cyphered chat, where the messages travel via web sockets cyphered and get decyphered
via API or electron's NodeJS integration.

## Install and execution

You'd need `yarn` installed, or use `npx` to execute it.

Run `yarn && yarn start`.

It will open the electron application, share the url of your local ip with a colleague in your same
network and start to chat.

In the electron app, the messages get cyphered/decyphered instantly via the NodeJS integration,
completely invisible for the user.

In the web app, the messages get cyphered/decyphered by fetching the backend app.
