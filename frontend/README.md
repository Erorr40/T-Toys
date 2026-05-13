# T-Toys Static Copy

This folder is prepared for static hosting upload (no npm, no PowerShell script required).

Source:
https://tots-toy-fun.base44.app/

## Available routes

- /
- /Home
- /Shop
- /Cart
- /ToyQuiz
- /ProductDetails
- /Profile
- /Wishlist
- /Orders
- /Rewards
- /ParentingTips
- /Notifications
- /TrackOrder
- /login

## Notes for deployment

- Upload the whole folder as-is.
- Main entry file is index.html.
- 404.html is included as a fallback for static hosts.
- /login is handled with a redirect page to avoid "page not found" in static mirrors.
