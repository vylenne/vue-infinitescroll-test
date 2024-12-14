# Vue3 Infinite scroller

Simple SPA application demonstrates library-free Infinite Scroller for rendering list of random user cards with next page loading on demand

## Technologies
- IntersectionObserver API
- Axios.js
- Vue3
- Vite
- typescript
- eslint (flat configuration)
- Random User API

## How to build and run
- Dev-server
  - `npm ci`
  - `npm run dev`

Application will be available by `http://localhost:5173/`
- Prod build
  - `npm ci`
  - `npm build`
  - `docker build -t frontend-app .`
  - `docker run -d -p 80:80 frontend-app`

Application will be available by `http://localhost`

## User Scenarios
### Infinite loader
#### Prerequisites:
- set "Slow 4G" speed in Network in dev-tools of browser (to see states of trigger)

#### Steps:
- open root url (see **How to build and run** section for URLs)
- see Loading view of trigger. It indicates that API-request is in progress
- after resolving see fist page of user cards
- scroll to bottom
- see Loading view of trigger in the bottom of list
- ...
- after 5 iterations scroll to bottom and see Limit view of trigger (default limit is 50 or 5 pages)

#### Notes:
- Limit is set in code (`src/components/InfiniteScroller/InfiniteScroller.vue` line: 17)
- Page size is set in code (`src/components/InfiniteScroller/components/PagingTrigger/PagingTrigger.vue` line: 82)
- You can change them in dev mode and see what will happen :-)

### Api-request error handling
#### Prerequisites:
- set "Slow 4G" speed in Network in dev-tools of browser (to see states of trigger)

#### Steps:
- To see Error view of trigger init `isError` flag with `true` (`src/components/InfiniteScroller/components/PagingTrigger/PagingTrigger.vue` line: 49)
- You will see Error View of trigger on the first load
- click on the button "Reload" (current page request will be run again)
- see Loading view and page of user cards after

#### Notes:
- Error view will handle each error in the current request
- User could try to load page again with "Reload" button and not to lose all previous pages

### Attempt to load another url
#### Steps:
- try any subroute in browser address bar
- see "404 Not Found" page

#### Notes:
- "404 Not found" page is implemented to let user know that there is no available routes except the root
- Link "Go to Home" is implemented in 404 page. It leads to the root
- The same functionality is implemented in AppHeader by clicking Home button in the top-left corner

